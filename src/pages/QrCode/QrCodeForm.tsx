import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { Autocomplete, Grid, TextField, Typography } from '@mui/material';

import { fetchArrayCourseTopics, fetchCreatedCourses } from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';

import { Course } from '../CoursesPage/types';

export interface CourseFormData {
  courseName: string;
  topicName: string;
  date: string;
}

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  onDeactivate: () => void;
}

const QrCodeForm: React.FC<CourseFormProps> = ({ onSubmit, onDeactivate }) => {
  const { control, register, handleSubmit, setValue } = useForm<CourseFormData>();
  const selectedCourse = useWatch({ control, name: 'courseName' });
  const selectedTopic = useWatch({ control, name: 'topicName' });

  const { userId } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseTopics, setCourseTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCourse) {
        const topics = await fetchArrayCourseTopics(selectedCourse);
        setCourseTopics(topics);
      } else {
        setCourseTopics([]);
      }
    };
    fetchTopics();
  }, [selectedCourse]);

  useEffect(() => {
    if (userId && courses.length === 0) {
      const fetchCourses = async () => {
        const createdCourses = await fetchCreatedCourses(userId);
        setCourses(createdCourses);
      };
      fetchCourses();
    }
  }, [userId, courses.length]);

  const handleCourseChange = (event: any, newValue: Course | null) => {
    setValue('courseName', newValue ? newValue.id : '');
    setValue('topicName', '');
  };

  const handleTopicChange = (event: any, newValue: string | null) => {
    setValue('topicName', newValue || '');
  };

  const handleFormSubmit = (data: CourseFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Course:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={courses}
            getOptionLabel={(option) => `${option.course_code} | ${option.course_group}`}
            onChange={handleCourseChange}
            value={courses.find((course) => course.id === selectedCourse) || null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a course"
                variant="outlined"
                {...register('courseName')}
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
        <Grid item xs={12}>
          <Typography variant="h6">
            Topic:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={courseTopics}
            getOptionLabel={(option) => option}
            onChange={handleTopicChange}
            value={selectedTopic || null}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a topic"
                variant="outlined"
                {...register('topicName')}
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
        <Grid item xs={12}>
          <Typography variant="h6">
            Date:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <input type="date" {...register('date')} required />
        </Grid>
      </Grid>
    </form>
  );
};

export default QrCodeForm;
