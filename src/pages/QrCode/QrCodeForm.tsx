import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Autocomplete, TextField, Typography } from '@mui/material';

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
  const { register, handleSubmit, setValue, watch } = useForm<CourseFormData>();
  const selectedCourse = watch('courseName');

  const { userId } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseTopics, setCourseTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCourse) {
        const topics = await fetchArrayCourseTopics(selectedCourse);
        setCourseTopics(topics);
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
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Course:
      </Typography>
      <Autocomplete
        options={courses}
        getOptionLabel={(option) => `${option.course_code} | ${option.course_group}`}
        onChange={handleCourseChange}
        value={courses.find((course) => course.id === selectedCourse) || null}
        onOpen={handleAutocompleteOpen}
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
              marginBottom: '2rem',
            }}
            size="small"
            fullWidth
            required
          />
        )}
      />
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Topic:
      </Typography>
      <Autocomplete
        options={courseTopics}
        getOptionLabel={(option) => option}
        onChange={handleTopicChange}
        value={watch('topicName')}
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
      <br />
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        Date:
      </Typography>
      <input type="date" {...register('date')} required />
      <br />
      <br />
    </form>
  );
};

export default QrCodeForm;