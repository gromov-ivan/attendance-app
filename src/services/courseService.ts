import { TeacherProfile } from '@/pages/CoursesPage/types';
import { supabase } from '@/supabaseClient';

export async function addCourse(course_code: string, course_group: string, user_id: string) {
  const { data, error } = await supabase
    .from('courses')
    .insert([{ course_code, course_group, teacher_id: user_id, status: 'Active' }]);

  if (error) throw new Error(error.message);

  return data?.[0];
}

export async function fetchCourses(userId: string) {
  // Fetch all courses where the user is a teacher
  const { data, error } = await supabase.rpc('fetch_user_courses', { user_id: userId });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data || [];
}

export async function fetchCreatedCourses(userId: string) {
  // Fetch the courses the user has created
  const { data: coursesData, error } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', userId);

  if (error) {
    console.error('Error fetching created courses:', error);
    return [];
  }
  return coursesData || [];
}

export async function fetchTeachers(): Promise<TeacherProfile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'teacher');

  if (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
  return data;
}

export async function assignTeachersToCourse(course_id: string, teacher_ids: string[]) {
  const { error } = await supabase
    .from('course_teachers')
    .insert(teacher_ids.map((teacher_id) => ({ course_id, teacher_id })));

  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchCourseTeachers(course_id: string): Promise<TeacherProfile[]> {
  const { data, error } = await supabase
    .from('course_teachers')
    .select(`teacher_id, profiles (id, full_name)`)
    .eq('course_id', course_id);

  if (error) {
    console.error('Error fetching course teachers:', error);
    return [];
  }

  const teachers: TeacherProfile[] = data.map(item => {
    const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles;

    return profile ? {
      id: profile.id,
      full_name: profile.full_name,
    } : null;
  }).filter((teacher): teacher is TeacherProfile => teacher !== null);

  return teachers;
}

export async function updateCourse(
  course_id: string,
  course_code: string,
  course_group: string,
  status: 'Active' | 'Inactive',
) {
  const { error } = await supabase
    .from('courses')
    .update({ course_code, course_group, status })
    .eq('id', course_id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchCourseTopics(course_id: string): Promise<string> {
  const { data, error } = await supabase
    .from('course_topics')
    .select('topic_name')
    .eq('course_id', course_id);

  if (error) {
    console.error('Error fetching course topics:', error);
    return '';
  }

  return data.map((topic) => topic.topic_name).join('; ');
}

export async function updateCourseTopics(course_id: string, topics: string) {
  await supabase.from('course_topics').delete().eq('course_id', course_id);

  const topicNames = topics
    .split(';')
    .map((t) => t.trim())
    .filter((t) => t !== '');

  const { error } = await supabase
    .from('course_topics')
    .insert(topicNames.map((topic_name) => ({ course_id, topic_name })));

  if (error) {
    throw new Error(error.message);
  }
}
