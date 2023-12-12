import { useEffect } from 'react';

import { fetchCreatedCourses, fetchTeachers } from '@/services/courseService';

export const useFetchCoursesAndTeachers = (userId: any, setCourses: any, setTeachers: any) => {
  useEffect(() => {
    async function loadData() {
      if (userId) {
        const createdCourses = await fetchCreatedCourses(userId);
        const allTeachers = await fetchTeachers();
        setCourses(createdCourses);
        setTeachers(allTeachers.filter((teacher) => teacher.id !== userId));
      }
    }
    loadData();
  }, [userId, setCourses, setTeachers]);
};
