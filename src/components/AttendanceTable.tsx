import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from '@mui/material';
import { RootState } from '@/store/reducers';

const AttendanceTable: React.FC = () => {
  const selectedCourse = useSelector((state: RootState) => state.attendance.selectedCourse);
  const studentAttendance = useSelector((state: RootState) => state.attendance.studentAttendance);
  const lessons = useSelector((state: RootState) => state.attendance.lessons);

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
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 500 }}>
          {selectedCourse}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              {lessons.map((lesson) => (
                <TableCell key={lesson}>{lesson}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {studentAttendance.map((student) => (
              <TableRow key={student.name}>
                <TableCell>{student.name}</TableCell>
                {lessons.map((lesson) => (
                  <TableCell
                    key={lesson}
                    style={{ backgroundColor: getAttendanceColor(student.attendance[lesson]) }}
                  >
                    {Math.round(student.attendance[lesson])}%
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default AttendanceTable;