import React from 'react';
import { Navigate } from 'react-router-dom';

import { Session } from '@supabase/supabase-js';

type ProtectedRouteProps = {
  session: Session | null;
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ session, children }) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
