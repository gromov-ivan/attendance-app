import Feed from '@mui/icons-material/Feed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SettingsIcon from '@mui/icons-material/Settings';

import asyncComponentLoader from '@/utils/loader';

import { Routes, SidebarLink } from './types';

// Pages to be displayed based on the user's role

export const teacherRoutes: Routes = {
  Courses: {
    component: asyncComponentLoader(() => import('@/pages/CoursesPage')),
    path: '/courses',
    title: 'Courses',
    icon: LibraryBooksIcon,
  },
  AttendanceList: {
    component: asyncComponentLoader(() => import('@/pages/AttendanceList')),
    path: '/attendance-list',
    title: 'Attendance List',
    icon: FormatListBulletedIcon,
  },
  QrCode: {
    component: asyncComponentLoader(() => import('@/pages/QrCode')),
    path: '/qr-code',
    title: 'QR Code',
    icon: QrCode2Icon,
  },
  StudentForm: {
    component: asyncComponentLoader(() => import('@/pages/StudentForm/StudentFormPage')),
    path: '/student-form',
    title: 'Student Form',
    icon: Feed,
  },
  Settings: {
    component: asyncComponentLoader(() => import('@/pages/Settings')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
};

export const studentRoutes: Routes = {
  Courses: {
    component: asyncComponentLoader(() => import('@/pages/CoursesPage')),
    path: '/courses',
    title: 'Courses',
    icon: LibraryBooksIcon,
  },
  AttendanceList: {
    component: asyncComponentLoader(() => import('@/pages/AttendanceList')),
    path: '/attendance-list',
    title: 'Attendance List',
    icon: FormatListBulletedIcon,
  },
  QrCode: {
    component: asyncComponentLoader(() => import('@/pages/QrCode')),
    path: '/qr-code',
    title: 'QR Code',
    icon: QrCode2Icon,
  },
  StudentForm: {
    component: asyncComponentLoader(() => import('@/pages/StudentForm/StudentFormPage')),
    path: '/student-form',
    title: 'Student Form',
    icon: Feed,
  },
  Settings: {
    component: asyncComponentLoader(() => import('@/pages/Settings')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
};

// Links to be displayed in the sidebar based on the user's role

export const teacherLinks: SidebarLink[] = [
  teacherRoutes.Courses,
  teacherRoutes.AttendanceList,
  teacherRoutes.QrCode,
  teacherRoutes.StudentForm,
  teacherRoutes.Settings,
];

export const studentLinks: SidebarLink[] = [
  studentRoutes.Courses,
  studentRoutes.AttendanceList,
  studentRoutes.QrCode,
  studentRoutes.StudentForm,
  studentRoutes.Settings,
];
