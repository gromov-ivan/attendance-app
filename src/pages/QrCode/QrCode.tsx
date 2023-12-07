import React, { useEffect, useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CourseForm, { CourseFormData } from './CourseForm';
import QrCodeGenerator from './QrCodeGenerator';

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
          margin: '24px 8px',
          padding: 2,
          backgroundColor: '#f2f2f2',
          border: '1px solid',
          borderColor: '#bfbfbf',
          borderRadius: '0.5rem',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Course Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CourseForm onSubmit={handleFormSubmit} />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleDeactivateQrCode} variant="contained" disableElevation>
              Deactivate QR Code
            </Button>
          </Grid>
          {showQrCode && (
            <Grid item xs={12}>
              <QrCodeGenerator courseName={courseInfo.courseName} date={courseInfo.date} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default QrCode;
