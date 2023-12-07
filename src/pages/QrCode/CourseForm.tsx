import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, TextField, Typography } from '@mui/material';

export interface CourseFormData {
  courseName: string;
  date: string;
}
interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<CourseFormData>();

  const handleFormSubmit = (data: CourseFormData) => {
    // Perform any necessary actions before submitting
    // ...

    // Call the external onSubmit function with the form data
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        <Typography>Course Name:</Typography>
        <TextField variant="outlined" size="small" {...register('courseName')} />
      </label>
      <br />
      <br />
      <label>
      <Typography>Date:</Typography>
        <input type="date" {...register('date')} />
      </label>
      <br />
      <br />
      <Button type="submit" variant="contained" disableElevation>
        Generate QR Code
      </Button>
    </form>
  );
};

export default CourseForm;
