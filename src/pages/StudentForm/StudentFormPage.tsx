// StudentFormPage.tsx
import React, { useState } from 'react';
import StudentForm, { StudentFormData } from './StudentForm';

const StudentFormPage: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<{ courseName: string; date: string } | null>(null);
  const [submittedStudents, setSubmittedStudents] = useState<string[]>([]);

  const handleFormSubmit = (data: StudentFormData) => {

    // Make the API call
    // For now, just adding the student number to the submitted students list
    setSubmittedStudents((prevStudents) => [...prevStudents, data.studentNumber]);
  };

  return (
    <div>
      {courseInfo && (
        <div>
          <h1>Course Information</h1>
          <p>Course Name: {courseInfo.courseName}</p>
          <p>Date: {courseInfo.date}</p>
        </div>
      )}
      <h1>Student Form</h1>
      <StudentForm onSubmit={handleFormSubmit} />
      <div>
        <h2>Submitted Students</h2>
        <ul>
          {submittedStudents.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentFormPage;
