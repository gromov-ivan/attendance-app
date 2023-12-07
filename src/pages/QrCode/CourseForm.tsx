import React from 'react';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';

export interface CourseFormData {
  courseName: string;
  date: string;
}

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  onDeactivate: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, onDeactivate }) => {
  const { register, handleSubmit } = useForm<CourseFormData>();

  const handleFormSubmit = (data: CourseFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
      <Typography variant="h6">Lesson: </Typography>
        <input {...register('courseName')} />
      </label>
      <br />
      <br />
      <label>
      <Typography variant="h6">Date: </Typography>
        <input type="date" {...register('date')} />
      </label>
    </form>
  );
};

export default CourseForm;
