import React from 'react';
import { useForm } from 'react-hook-form';

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
        Course Name:
        <input {...register('courseName')} />
      </label>
      <br />
      <label>
        Date:
        <input type="date" {...register('date')} />
      </label>
      <br />
      <button type="submit">Generate QR Code</button>
    </form>
  );
};

export default CourseForm;