// StudentForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

export interface StudentFormData {
  studentNumber: string;
}

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<StudentFormData>();

  const handleFormSubmit = (data: StudentFormData) => {
    // Call the external onSubmit function with the form data
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>
        Student Number:
        <input {...register('studentNumber')} />
      </label>
      <br />
      <Button type="submit">Submit Form</Button>
    </form>
  );
};

export default StudentForm;
