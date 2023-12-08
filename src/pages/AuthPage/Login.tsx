import { useState } from 'react';

import { Box, TextField, Typography } from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';

import { supabase } from '../../supabaseClient';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
    } catch (error: any) {
      setError(
        error.error_description || error.message || 'An unknown error occurred during login',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '1.5rem' }}>
        Metropolia Attendance App
      </Typography>
      <Typography
        sx={{ fontSize: '1rem', fontWeight: 400, marginBottom: '1rem', maxWidth: '340px' }}
      >
        <span style={{ fontWeight: 600, textDecoration: 'underline' }}>Important</span>
        <span style={{ fontWeight: 600 }}>:</span> Please use your OMA Metropolia username, email
        address, and password
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: '0.5rem' }}
        InputProps={{ sx: { borderRadius: '0.5rem' } }}
        size="small"
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: '1rem' }}
        InputProps={{ sx: { borderRadius: '0.5rem' } }}
        size="small"
        fullWidth
        required
      />
      <ContainedButton
        type="submit"
        sx={{ mt: '1.5rem', mb: '8px' }}
        onClick={handleLogin}
        disabled={loading}
        fullWidth
      >
        Log in
      </ContainedButton>
      {error && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px solid #ff6369',
            borderRadius: '0.5rem',
            bgcolor: '#fff8f8',
            marginTop: '1rem',
          }}
        >
          <Typography color="#ff6369" align="center" sx={{ padding: '1rem', maxWidth: '320px' }}>
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Login;
