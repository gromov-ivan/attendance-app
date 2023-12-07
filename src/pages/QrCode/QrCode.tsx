import React, { useEffect, useState } from 'react';

import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';

import CourseForm, { CourseFormData } from './CourseForm';
import QrCodeGenerator from './QrCodeGenerator';

const QrCode: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<CourseFormData>({ courseName: '', date: '' });
  const [qrCodeKey, setQrCodeKey] = useState<number>(0);
  const [isQrCodeActive, setIsQrCodeActive] = useState<boolean>(false);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [studentNames, setStudentNames] = useState<string[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isQrCodeActive) {
      // Update the QR code every 5 seconds
      intervalId = setInterval(() => {
        // Incrementing the key will force the QrCodeGenerator component to re-render
        setQrCodeKey((prevKey) => prevKey + 1);
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isQrCodeActive]);

  const handleFormSubmit = (data: CourseFormData) => {
    setCourseInfo(data);
    console.log(data);
    setQrCodeKey((prevKey) => prevKey + 1);
  };

  const handleDeactivateQrCode = () => {
    setIsQrCodeActive(false);
  };

  const handleActivateQrCode = () => {
    setIsQrCodeActive(true);
  };

  const handleStudentSubmit = () => {
    // Placeholder names (replace with actual names from the API later)
    const newStudentNames = [...studentNames, `Student ${studentCount + 1}`];
    setStudentNames(newStudentNames);
    setStudentCount(studentCount + 1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'rgba(250, 250, 250, 0.6)',
          margin: '25px',
          display: 'flex',
        }}
      >
        {/* Left side with QR code */}
        <div style={{ flex: 1, padding: '1rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid',
              borderColor: '#bfbfbf',
              borderRadius: '0.5rem',
            }}
          >
            <Typography variant="h4">Create attendance QR code</Typography>
          </div>
          <CourseForm onSubmit={handleFormSubmit} onDeactivate={handleDeactivateQrCode} />
          <ContainedButton
            onClick={handleActivateQrCode}
            disabled={isQrCodeActive}
            sx={{ marginTop: '1rem' }}
          >
            Create QR Code
          </ContainedButton>
          <ContainedButton
            onClick={handleDeactivateQrCode}
            disabled={!isQrCodeActive}
            sx={{ marginTop: '1rem', marginLeft: '1rem' }}
          >
            Deactivate QR Code
          </ContainedButton>
          {isQrCodeActive && (
            <QrCodeGenerator
              key={qrCodeKey}
              courseName={courseInfo.courseName}
              date={courseInfo.date}
            />
          )}
        </div>

        {/* Display student count and names */}
        <div style={{ flex: 1, padding: '1rem', marginLeft: '1rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid',
              borderColor: '#bfbfbf',
              borderRadius: '0.5rem',
            }}
          >
            <Typography variant="h4">Submitted students</Typography>
          </div>
          <Box mt={2}>
            <Typography variant="h6">Student Count: {studentCount}</Typography>
            <List>
              {studentNames.map((name, index) => (
                <ListItem key={index}>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Button to simulate student form submission */}
          <Button onClick={handleStudentSubmit} disabled={!isQrCodeActive}>
            Simulate Student Submission
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default QrCode;
