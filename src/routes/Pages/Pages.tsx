import { Navigate, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import AuthPage from '@/pages/AuthPage';
import { useUser } from '@/store/user/UserContext';

import { studentRoutes, teacherRoutes } from '..';
import { getPageHeight } from './utils';

function Pages() {
  const { userRole, loading, session } = useUser();

  if (loading) {
    return null;
  }

  if (!session) {
    return <AuthPage />;
  }

  if (session && !userRole) {
    return null;
  }

  const basePath = `/${userRole}`;
  const defaultRoute = userRole === 'teacher' ? '/courses' : '/student-form';
  const routes = userRole === 'teacher' ? teacherRoutes : studentRoutes;

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => (
          <Route key={path} path={`${basePath}${path}`} element={<Component />} />
        ))}
        <Route path="/" element={<Navigate replace to={`${basePath}${defaultRoute}`} />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Box>
  );
}

export default Pages;
