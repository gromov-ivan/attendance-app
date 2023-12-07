import { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';
import { checkStaffStatus } from '@/utils/opendata';

import { supabase } from '../../supabaseClient';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      // Check that the email is a Metropolia email
      if (!email.toLowerCase().endsWith('@metropolia.fi')) {
        throw new Error(
          'Please use your Metropolia email address: firstname.lastname@metropolia.fi',
        );
      }

      const staffData = await checkStaffStatus(username, password);

      // Check if the username or password are valid
      if (staffData.message === 'invalid username or password') {
        throw new Error('Invalid username or password');
      }

      // Check if the username and email match
      if (staffData.email.toLowerCase() !== email.toLowerCase() || staffData.user !== username) {
        throw new Error('The entered data does not match');
      }

      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });

      if (signUpError) {
        // Check for duplicate username
        if (signUpError.message.includes('duplicate key value violates unique constraint')) {
          throw new Error('Account with this username has already been created');
        }
        throw signUpError;
      }

      // Set the user role and full name after successful sign-up
      const role = staffData.staff ? 'teacher' : 'student';
      const fullName = `${staffData.firstname} ${staffData.lastname}`;

      if (user.user?.id) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role, full_name: fullName })
          .eq('id', user.user.id);

        if (updateError) throw updateError;
      }
    } catch (error: any) {
      setError(
        error.error_description || error.message || 'An unknown error occurred during signup',
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
        <span style={{ fontWeight: 600, textDecoration: 'underline' }}>Improtant</span>
        <span style={{ fontWeight: 600 }}>:</span> Please use your OMA Metropolia username, email
        address, and password
      </Typography>
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mt: '0.5rem' }}
        InputProps={{ sx: { borderRadius: '0.5rem' } }}
        autoComplete="new-password"
        size="small"
        fullWidth
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: '1rem' }}
        InputProps={{ sx: { borderRadius: '0.5rem' } }}
        autoComplete="new-password"
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
        autoComplete="new-password"
        size="small"
        fullWidth
        required
      />
      <ContainedButton
        type="submit"
        sx={{ mt: '1.5rem', mb: '8px' }}
        onClick={handleSignUp}
        disabled={loading}
        fullWidth
      >
        Sign up
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
          <Typography color="#ff6369" align="center" sx={{ padding: '0.5rem', maxWidth: '320px' }}>
            {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SignUp;
