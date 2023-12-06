import React, { useState } from 'react';

interface StudentFormProps {
  qrCodeData: { name: string; date: string };
  onSubmit: (studentNumber: string) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ qrCodeData, onSubmit }) => {
  const [studentNumber, setStudentNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studentNumber);
  };

  return (
    <div>
      <p>Class: {qrCodeData.name}</p>
      <p>Date: {qrCodeData.date}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Student Number:
          <input
            type="text"
            name="studentNumber"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
          />
        </label>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default StudentForm;
