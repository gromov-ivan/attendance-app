import { useState } from 'react';

import { Box, Link } from '@mui/material';

import Login from './Login';
import SignUp from './SignUp';

function AuthPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid #bfbfbf',
          borderRadius: '0.5rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          padding: '2rem 3rem',
          marginTop: '2rem',
        }}
      >
        {isSigningUp ? (
          <>
            <SignUp />
            <Link
              color="#808080"
              component="button"
              type="button"
              variant="body2"
              onClick={() => setIsSigningUp(false)}
              sx={{ mt: 2 }}
            >
              Already have an account? Log in
            </Link>
          </>
        ) : (
          <>
            <Login />
            <Link
              color="#808080"
              component="button"
              type="button"
              variant="body2"
              onClick={() => setIsSigningUp(true)}
              sx={{ mt: 2 }}
            >
              Don&apos;t have an account? Sign up
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default AuthPage;
