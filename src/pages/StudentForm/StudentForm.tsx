import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

// StudentForm component
const StudentForm: React.FC<{ course: string; date: string }> = ({ course, date }) => {
  const { register, handleSubmit, formState } = useForm();

  // Handle form submission (you need to implement this function)
  const onSubmit = (data: any) => {
    // Send the student number to the server or update state as needed
    console.log('Student Number Submitted:', data.studentNumber);
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Typography variant="h5">Student Form for {course}</Typography> */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Student Number"
            variant="outlined"
            {...register('studentNumber', { required: true })}
            error={!!formState.errors.studentNumber}
            helperText={formState.errors.studentNumber && 'Student number is required'}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default StudentForm;
