import React from 'react';

import AttendanceTable from './AttendanceTable';
import CourseSelection from './CourseSelection';

const AttendancePage: React.FC = () => {
  return (
    <div style={{ margin: '10px' }}>
      <CourseSelection />
      <AttendanceTable />
    </div>
  );
};

export default AttendancePage;
