import React from 'react';

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const AttendanceTable: React.FC = () => {
  const getAttendanceColor = (percentage: number) => {
    const saturation = 100;
    const lightness = 50;

    if (percentage >= 80) return `hsl(120, ${saturation}%, ${lightness}%)`;
    if (percentage >= 60) return `hsl(60, ${saturation}%, ${lightness}%)`;
    return `hsl(0, 0%, ${lightness}%)`;
  };

  return (
    <Grid container spacing={2} sx={{ padding: '1.5rem' }}>
      <TableContainer component={Paper} sx={{ width: '100%', marginBottom: '1rem' }}>
        <Typography variant="h5" sx={{ padding: '1rem', fontWeight: 500 }}>
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default AttendanceTable;
