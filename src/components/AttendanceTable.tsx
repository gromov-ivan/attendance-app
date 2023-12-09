import React from 'react';
import { useSelector } from 'react-redux';

const AttendanceTable: React.FC = () => {
  const selectedCourse = useSelector((state) => state.attendance.selectedCourse);
  const studentAttendance = useSelector((state) => state.attendance.studentAttendance);

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'yellow';
    return 'grey';
  };

  return (
    <div>
      <h3>Attendance Table for {selectedCourse}</h3>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {studentAttendance.map((student) => (
            <tr key={student.name}>
              <td>{student.name}</td>
              <td style={{ backgroundColor: getAttendanceColor(student.attendance) }}>
                {Math.round(student.attendance)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
