import { Navigate, Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import { Session } from '@supabase/supabase-js';

import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import AuthPage from '@/pages/AuthPage';
import NotFound from '@/pages/NotFound';

import routes from '..';
import { getPageHeight } from './utils';

type PagesProps = {
  session: Session | null;
};

function Pages({ session }: PagesProps) {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {session ? (
          <>
            {Object.values(routes).map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute session={session}>
                    <Component />
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Box>
  );
}

export default Pages;
