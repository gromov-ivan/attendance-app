// Import necessary components and modules
import React from 'react';
import { useForm } from 'react-hook-form';

// StudentForm component
const StudentForm: React.FC<{ course: string; date: string }> = ({ course, date }) => {
  const { register, handleSubmit } = useForm();

  // Handle form submission (you need to implement this function)
  const onSubmit = (data: any) => {
    // Send the student number to the server or update state as needed
    console.log('Student Number Submitted:', data.studentNumber);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Student Number:
        <input {...register('studentNumber', { required: true })} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
