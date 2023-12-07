import QrCode2Icon from '@mui/icons-material/QrCode2';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import CourseForm from '@/pages/QrCode/CourseForm';
import QrCodeGenerator from '@/pages/QrCode/QrCodeGenerator';
import StudentFormPage from '@/pages/StudentForm/StudentFormPage';
import asyncComponentLoader from '@/utils/loader';
import { PropTypes } from '@mui/material';
import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.HomePage]: {
    component: asyncComponentLoader(() => import('@/pages/HomePage')),
    path: '/',
    title: 'Home Page',
    icon: HomeIcon,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/attendance-list',
    title: 'Attendance List',
    icon: FormatListBulletedIcon,
  },
  [Pages.QrCode]: {
    component: asyncComponentLoader(() => import('@/pages/QrCode')),
    path: '/qr-code',
    title: 'QR Code',
    icon: QrCode2Icon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
  [Pages.StudentForm]: {
    component: asyncComponentLoader(() => import('@/pages/StudentForm/StudentFormPage')),
    path: '/student-form',
    title: 'Student Form',
  },
};

export default routes;
