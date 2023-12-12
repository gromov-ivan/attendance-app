import React from 'react';

import AttendanceTable from '@/components/AttendanceTable';
import CourseSelection from '@/components/CourseSelection';

const AttendancePage: React.FC = () => {
  return (
    <div style={{ margin: '10px' }}>
      <CourseSelection />
      <AttendanceTable />
    </div>
  );
};

export default AttendancePage;
