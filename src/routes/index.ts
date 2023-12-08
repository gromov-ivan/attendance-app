import Feed from '@mui/icons-material/Feed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SettingsIcon from '@mui/icons-material/Settings';

import CourseForm from '@/pages/QrCode/CourseForm';
import QrCodeGenerator from '@/pages/QrCode/QrCodeGenerator';
import StudentFormPage from '@/pages/StudentForm/StudentFormPage';
import asyncComponentLoader from '@/utils/loader';

import { Routes, SidebarLink } from './types';

// Pages to be displayed based on the user's role

export const teacherRoutes: Routes = {
  Home: {
    component: asyncComponentLoader(() => import('@/pages/HomePage')),
    path: '/home',
    title: 'Home Page',
    icon: HomeIcon,
  },
  AttendanceList: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
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
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
};

export const studentRoutes: Routes = {
  Home: {
    component: asyncComponentLoader(() => import('@/pages/HomePage')),
    path: '/home',
    title: 'Home Page',
    icon: HomeIcon,
  },
  AttendanceList: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
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
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
};

// Links to be displayed in the sidebar based on the user's role

export const teacherLinks: SidebarLink[] = [
  teacherRoutes.Home,
  teacherRoutes.AttendanceList,
  teacherRoutes.QrCode,
  teacherRoutes.StudentForm,
  teacherRoutes.Settings,
];

export const studentLinks: SidebarLink[] = [
  studentRoutes.Home,
  studentRoutes.AttendanceList,
  studentRoutes.QrCode,
  studentRoutes.StudentForm,
  studentRoutes.Settings,
];
