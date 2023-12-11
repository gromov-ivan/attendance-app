export type Course = {
  id: string;
  course_code: string;
  course_group: string;
  status: 'Active' | 'Inactive';
};

export type TeacherProfile = {
  id: string;
  full_name: string;
};
