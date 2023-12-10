import React, { useState } from 'react';
import StudentForm, { StudentFormData } from './StudentForm';
import { Typography, List, ListItem, Divider, Paper } from '@mui/material';

const StudentFormPage: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<{ courseName: string; date: string } | null>(null);
  const [submittedStudents, setSubmittedStudents] = useState<string[]>([]);

  const handleFormSubmit = (data: StudentFormData) => {
    // Make the API call
    // For now, just adding the student number to the submitted students list
    setSubmittedStudents((prevStudents) => [...prevStudents, data.studentNumber]);
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      {courseInfo && (
        <div>
          <Typography variant="h4">Course Information</Typography>
          <Typography>Course Name: {courseInfo.courseName}</Typography>
          <Typography>Date: {courseInfo.date}</Typography>
          <Divider style={{ margin: '16px 0' }} />
        </div>
      )}
      <Typography variant="h4">Student Form</Typography>
      <StudentForm onSubmit={handleFormSubmit} />
      <Divider style={{ margin: '16px 0' }} />
      <div>
        <Typography variant="h5">Submitted Students</Typography>
        <List>
          {submittedStudents.map((student, index) => (
            <ListItem key={index}>
              <Typography>{student}</Typography>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
};

export default StudentFormPage;