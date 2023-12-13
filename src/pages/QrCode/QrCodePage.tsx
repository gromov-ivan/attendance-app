import React, { useEffect, useState } from 'react';

import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';

import QrCodeForm, { CourseFormData } from './QrCodeForm';
import QrCodeGenerator from './QrCodeGenerator';

const QrCodePage: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<CourseFormData>({ courseName: '', topicName: '', date: '' });
  const [qrCodeKey, setQrCodeKey] = useState<number>(0);
  const [isQrCodeActive, setIsQrCodeActive] = useState<boolean>(false);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [studentNames, setStudentNames] = useState<string[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isQrCodeActive) {
      intervalId = setInterval(() => {
        setQrCodeKey((prevKey) => prevKey + 1);
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [isQrCodeActive]);

  const handleFormSubmit = (data: CourseFormData) => {
    setCourseInfo(data);
    setQrCodeKey((prevKey) => prevKey + 1);
  };

  const handleDeactivateQrCode = () => {
    setIsQrCodeActive(false);
  };

  const handleActivateQrCode = () => {
    setIsQrCodeActive(true);
  };

  const handleStudentCount = () => {
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
          border: '1px solid #bfbfbf',
          borderRadius: '0.5rem',
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.2)',
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
              padding: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h5">Create attendance QR code</Typography>
          </div>
          <QrCodeForm onSubmit={handleFormSubmit} onDeactivate={handleDeactivateQrCode} />
          <ContainedButton
            onClick={handleActivateQrCode}
            disabled={isQrCodeActive}
            sx={{ marginTop: '2rem' }}
          >
            Create QR Code
          </ContainedButton>
          <ContainedButton
            onClick={handleDeactivateQrCode}
            disabled={!isQrCodeActive}
            sx={{ marginTop: '2rem', marginLeft: '1rem' }}
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
              padding: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="h5">Submitted students</Typography>
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
        </div>
      </Box>
    </Box>
  );
};

export default QrCodePage;
