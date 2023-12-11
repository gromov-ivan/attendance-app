import { useEffect, useState } from 'react';

import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';
import {
  assignTeachersToCourse,
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

export const EditCourseForm = ({ onCourseUpdated }: { onCourseUpdated: () => void }) => {
  const { userId } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTeachers, setSelectedTeachers] = useState<TeacherProfile[]>([]);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [courseTopics, setCourseTopics] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (userId) {
        const createdCourses = await fetchCreatedCourses(userId);
        setCourses(createdCourses);
        const allTeachers = await fetchTeachers();
        setTeachers(allTeachers.filter((teacher) => teacher.id !== userId));
      }
    };
    loadData();
  }, [userId]);

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

  const handleAutocompleteOpen = async () => {
    if (userId) {
      const createdCourses = await fetchCreatedCourses(userId);
      setCourses(createdCourses);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCourse) {
      alert('Select a course to update or assign teachers');
      return;
    }

    if (selectedTeachers.length > 0) {
      const teacher_ids = selectedTeachers.map((teacher) => teacher.id);
      await assignTeachersToCourse(selectedCourse.id, teacher_ids);
    }

    const selectedTeacherIds = selectedTeachers.map((t) => t.id);

    await supabase.from('course_teachers').delete().eq('course_id', selectedCourse.id);
    await supabase
      .from('course_teachers')
      .insert(
        selectedTeacherIds.map((teacher_id) => ({ course_id: selectedCourse.id, teacher_id })),
      );

    if (!courseTopics.trim() || (courseTopics.split(';').length && !courseTopics.endsWith(';'))) {
      await updateCourseTopics(selectedCourse.id, courseTopics.trim());
    } else {
      if (courseTopics.endsWith(';')) {
        alert('Please input the topics in the correct format.');
        return;
      }
    }

    await updateCourse(
      selectedCourse.id,
      selectedCourse.course_code,
      selectedCourse.course_group,
      status,
    );

    alert('Course updated successfully');
    onCourseUpdated();
  };

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 500, marginBottom: '0.5rem' }}>
          Edit your courses
        </Typography>
        <Typography>Here you can update the courses you have created.</Typography>
        <Typography>You can add course topics and add other teachers to the course.</Typography>
        <Typography sx={{ marginBottom: '1rem' }}>
          When you add teachers to the course, they will be able to see the course in their
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
              getOptionLabel={(option) => `${option.course_code} | ${option.course_group}`}
              onChange={(event, newValue) => setSelectedCourse(newValue)}
              value={selectedCourse}
              onOpen={handleAutocompleteOpen}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a course"
                  variant="outlined"
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
                  value={selectedCourse.course_code}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, course_code: e.target.value })
                  }
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
                  value={selectedCourse.course_group}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, course_group: e.target.value })
                  }
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
