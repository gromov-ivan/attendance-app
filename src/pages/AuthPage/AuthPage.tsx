import { Box } from '@mui/material';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { supabase } from '../../supabaseClient';

function AuthPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: '8px',
              borderColor: 'rgba(0,0,0,0)',
            },
          },
          variables: {
            default: {
              colors: {
                brand: '#ff854d',
                brandAccent: '#ff621a',
              },
            },
          },
        }}
        providers={[]}
      />
    </Box>
  );
}

export default AuthPage;
