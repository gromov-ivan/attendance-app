import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store'
import CourseSelection from '@/components/CourseSelection';
import AttendanceTable from '@/components/AttendanceTable';

const AttendancePage: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <CourseSelection />
        <AttendanceTable />
      </div>
    </Provider>
  );
};

export default AttendancePage;
