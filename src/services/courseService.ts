import { supabase } from '@/supabaseClient';

export async function addCourse(course_code: string, course_group: string, user_id: string) {
  const { data, error } = await supabase
    .from('courses')
    .insert([{ course_code, course_group, teacher_id: user_id, status: 'Active' }]);

  if (error) throw new Error(error.message);

  return data?.[0];
}

export async function fetchCourses(userId: string) {
  const { data: coursesData, error } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', userId);

  if (error) {
    console.error('error', error);
    return [];
  }
  return coursesData || [];
}
