import React, { useState, useEffect } from 'react';
import QrCodeGenerator from './QrCodeGenerator';
import CourseForm, { CourseFormData } from './CourseForm';
import { Box } from '@mui/system';

const QrCode: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<CourseFormData>({ courseName: '', date: '' });
  const [qrCodeKey, setQrCodeKey] = useState<number>(0);

  useEffect(() => {
    // Update the QR code every 5 seconds
    const intervalId = setInterval(() => {
      // Incrementing the key will force the QrCodeGenerator component to re-render
      setQrCodeKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (data: CourseFormData) => {
    // Update the course information when the form is submitted
    setCourseInfo(data);
    // Reset the key to force the QrCodeGenerator component to re-render immediately
    setQrCodeKey((prevKey) => prevKey + 1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'rgba(250, 250, 250, 0.6)',
          margin: '25px',
        }}
      >
        <div>
          <h1>Course Information</h1>
          <CourseForm onSubmit={handleFormSubmit} />
          <QrCodeGenerator key={qrCodeKey} courseName={courseInfo.courseName} date={courseInfo.date} />
        </div>
      </Box>
    </Box>
  );
};

export default QrCode;
