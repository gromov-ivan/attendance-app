import { useEffect, useState } from 'react';
import React from 'react';

import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { differenceBy } from 'lodash';

import ContainedButton from '@/components/ContainedButton/ContainedButton';
import {
  fetchCourseTeachers,
  fetchCourseTopics,
  fetchCreatedCourses,
  fetchTeachers,
  updateCourse,
  updateCourseTopics,
} from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';
import { supabase } from '@/supabaseClient';

import { Course, TeacherProfile } from './types';

const useFetchCoursesAndTeachers = (userId: any, setCourses: any, setTeachers: any) => {
  useEffect(() => {
    async function loadData() {
      if (userId) {
        const createdCourses = await fetchCreatedCourses(userId);
        const allTeachers = await fetchTeachers();
        setCourses(createdCourses);
        setTeachers(allTeachers.filter((teacher) => teacher.id !== userId));
      }
    }
    loadData();
  }, [userId, setCourses, setTeachers]);
};

export const EditCourseForm = ({ onCourseUpdated }: { onCourseUpdated: () => void }) => {
  const { userId } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<TeacherProfile[]>([]);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [courseTopics, setCourseTopics] = useState('');

  // Select a course Autocomplete
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autocompleteCourse, setAutocompleteCourse] = useState<Course | null>(null);
  const [courseCodeInput, setCourseCodeInput] = useState('');
  const [courseGroupInput, setCourseGroupInput] = useState('');

  useFetchCoursesAndTeachers(userId, setCourses, setTeachers);

  useEffect(() => {
    setAutocompleteCourse(selectedCourse);
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      setStatus(selectedCourse.status);
    } else {
      setStatus('Active');
    }
  }, [selectedCourse]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (selectedCourse) {
        const additionalTeachers = await fetchCourseTeachers(selectedCourse.id);
        setSelectedTeachers(additionalTeachers);
      } else {
        setSelectedTeachers([]);
      }
    };

    fetchTeachers();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCourse) {
        setStatus(selectedCourse.status);
        const topicsString = await fetchCourseTopics(selectedCourse.id);
        setCourseTopics(topicsString);
      } else {
        setStatus('Active');
        setCourseTopics('');
      }
    };

    fetchTopics();
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      setCourseCodeInput(selectedCourse.course_code);
      setCourseGroupInput(selectedCourse.course_group);
    }
  }, [selectedCourse]);

  const handleAutocompleteOpen = async () => {
    if (!open && userId) {
      setOpen(true);
      setLoading(true);
      const createdCourses = await fetchCreatedCourses(userId);
      setCourses(createdCourses);
      setLoading(false);
    }
  };

  const handleCourseChange = (event: any, newValue: Course | null) => {
    setSelectedCourse(newValue);
    setAutocompleteCourse(newValue);
  };

  const getOptionLabel = (course: Course) => {
    const foundCourse = courses.find((c) => c.id === course.id) || course;
    return `${foundCourse.course_code} | ${foundCourse.course_group}`;
  };

  const handleSubmit = async () => {
    if (!selectedCourse) {
      alert('Select a course to update or assign teachers');
      return;
    }

    const existingTeachers = await fetchCourseTeachers(selectedCourse.id);
    const teachersToRemove = differenceBy(existingTeachers, selectedTeachers, 'id');
    const teachersToAdd = differenceBy(selectedTeachers, existingTeachers, 'id');

    await Promise.all(
      teachersToRemove.map((teacher) =>
        supabase
          .from('course_teachers')
          .delete()
          .match({ course_id: selectedCourse.id, teacher_id: teacher.id }),
      ),
    );

    await Promise.all(
      teachersToAdd.map((teacher) =>
        supabase
          .from('course_teachers')
          .insert({ course_id: selectedCourse.id, teacher_id: teacher.id }),
      ),
    );

    if (!courseTopics.trim() || (courseTopics.split(';').length && !courseTopics.endsWith(';'))) {
      await updateCourseTopics(selectedCourse.id, courseTopics.trim());
    } else {
      if (courseTopics.endsWith(';')) {
        alert('Please input the topics in the correct format.');
        return;
      }
    }

    await updateCourse(selectedCourse.id, courseCodeInput, courseGroupInput, status);

    alert('Course updated successfully');
    onCourseUpdated();
  };

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 500, marginBottom: '0.5rem' }}>
          Edit your courses
        </Typography>
        <Typography>• Here you can update the courses you have created.</Typography>
        <Typography>• You can add course topics and add other teachers to the course.</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>
          • When you add teachers to the course, they will be able to see the course in their
          dashboard.
        </Typography>
        <Grid
          item
          container
          xs={12}
          md={12}
          spacing={2}
          sx={{
            display: 'flex',
            border: '1px solid #bfbfbf',
            borderRadius: '0.5rem',
            boxShadow: '0 0 2px rgba(0,0,0,0.2)',
            alignContent: 'flex-start',
            padding: '0 1rem 1rem 0',
            margin: '0rem',
            overflow: 'auto',
          }}
        >
          <Grid item xs={12}>
            <Autocomplete
              options={courses}
              open={open}
              onOpen={handleAutocompleteOpen}
              onClose={() => {
                setOpen(false);
                setCourses([]);
              }}
              onChange={handleCourseChange}
              value={autocompleteCourse}
              loading={loading}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={getOptionLabel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a course"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="primary" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                    },
                  }}
                  size="small"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>
          {selectedCourse && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Course Code"
                  variant="outlined"
                  type="text"
                  value={courseCodeInput}
                  onChange={(e) => setCourseCodeInput(e.target.value)}
                  InputProps={{ sx: { borderRadius: '0.5rem' } }}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Course Group"
                  variant="outlined"
                  type="text"
                  value={courseGroupInput}
                  onChange={(e) => setCourseGroupInput(e.target.value)}
                  InputProps={{ sx: { borderRadius: '0.5rem' } }}
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  fullWidth
                  required
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                    },
                  }}
                >
                  <InputLabel>Course Status</InputLabel>
                  <Select
                    value={status}
                    label="Course Status"
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                    size="small"
                    fullWidth
                  >
                    <MenuItem
                      value="Active"
                      sx={{ '&.Mui-selected': { color: '#000', fontWeight: 500 } }}
                    >
                      Active
                    </MenuItem>
                    <MenuItem
                      value="Inactive"
                      color="black"
                      sx={{ '&.Mui-selected': { color: '#000', fontWeight: 500 } }}
                    >
                      Inactive
                    </MenuItem>
                  </Select>
                  <FormHelperText>Set the course status</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Topics"
                  variant="outlined"
                  type="text"
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                    },
                  }}
                  helperText="Enter course topics separated by a semicolon (;)"
                  placeholder="Topic 1; Topic 2; Topic 3"
                  value={courseTopics}
                  onChange={(e) => setCourseTopics(e.target.value)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="teachers-autocomplete"
                  options={teachers}
                  getOptionLabel={(option) => option.full_name}
                  value={selectedTeachers}
                  onChange={(event, newValue) => {
                    setSelectedTeachers(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Additional teachers in the course"
                      placeholder="Select teachers"
                      helperText="Add or delete teachers in the course"
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-root': {
                          backgroundColor: '#fff',
                          borderRadius: '0.5rem',
                        },
                      }}
                      size="small"
                      fullWidth
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                />
              </Grid>
              <Grid item xs={12}>
                <ContainedButton onClick={handleSubmit}>Update Course</ContainedButton>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
