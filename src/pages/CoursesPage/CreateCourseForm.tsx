import { useState } from 'react';

import { Grid, TextField, Typography } from '@mui/material';

import ContainedButton from '@/components/ContainedButton/ContainedButton';
import { addCourse } from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';

export const CreateCourseForm = ({ onCourseAdded }: { onCourseAdded: () => void }) => {
  const [courseCode, setCourseCode] = useState('');
  const [courseGroup, setCourseGroup] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { userId } = useUser();

  const handleCreateCourse = async () => {
    if (!userId) {
      alert('User not authenticated.');
      return;
    }
    if (!courseCode || !courseGroup) {
      alert('Both fields are required.');
      return;
    }
    setIsAdding(true);

    try {
      await addCourse(courseCode, courseGroup, userId);
      setCourseCode('');
      setCourseGroup('');
      onCourseAdded();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 500 }}>
          Create new course
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        sx={{
          border: '1px solid',
          borderColor: '#bfbfbf',
          borderRadius: '0.5rem',
          alignContent: 'flex-start',
          padding: '0 1rem 1rem 0',
          margin: '0rem',
          height: '505px',
          overflow: 'auto',
        }}
      >
        <Grid item xs={12}>
          <TextField
            label="Course Code"
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            autoComplete="new-password"
            size="small"
            helperText="For example: TX00EW84-3003"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Group"
            type="text"
            value={courseGroup}
            onChange={(e) => setCourseGroup(e.target.value)}
            InputProps={{ sx: { borderRadius: '0.5rem' } }}
            autoComplete="new-password"
            size="small"
            helperText="For example: Course1-TXL22S1-C"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <ContainedButton
            type="submit"
            variant="contained"
            onClick={handleCreateCourse}
            //disabled={isAdding}
          >
            Create Course
          </ContainedButton>
        </Grid>
      </Grid>
    </>
  );
};
