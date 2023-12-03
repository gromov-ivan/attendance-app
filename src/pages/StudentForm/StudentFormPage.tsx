import React, { useState } from 'react';
import StudentForm from './StudentForm';

const StudentFormPage: React.FC = () => {
  const [qrCodeData, setQrCodeData] = useState({ name: '', date: '' });

  const handleFormSubmit = (studentNumber: string) => {
    // Implement logic to submit the student form
    // Update teacher's screen with student number and count
  };

  return <StudentForm qrCodeData={qrCodeData} onSubmit={handleFormSubmit} />;
};

export default StudentFormPage;
