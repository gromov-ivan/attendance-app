// QrCode.tsx
import React, { useState, useEffect } from 'react';
import QrCodeGenerator from './QrCodeGenerator';
import CourseForm, { CourseFormData } from './CourseForm';
import { Box } from '@mui/system';

const QrCode: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<CourseFormData>({ courseName: '', date: '' });
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showQrCode) {
      // Update the QR code every 5 seconds when showQrCode is true
      intervalId = setInterval(() => {
        // Fetch updated course information if needed
        // For now, use the existing courseInfo state
      }, 5000);
    }

    return () => clearInterval(intervalId);
  }, [showQrCode, courseInfo]);

  const handleFormSubmit = (data: CourseFormData) => {
    // Update the course information when the form is submitted
    setCourseInfo(data);
    setShowQrCode(true); // Show the QR code
  };

  const handleDeactivateQrCode = () => {
    setShowQrCode(false);
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
          <button onClick={handleDeactivateQrCode}>Deactivate QR Code</button>
          {showQrCode && <QrCodeGenerator courseName={courseInfo.courseName} date={courseInfo.date} />}
        </div>
      </Box>
    </Box>
  );
};

export default QrCode;
