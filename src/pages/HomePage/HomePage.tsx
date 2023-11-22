import React from 'react';
import { AppBar, Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';

function HomePage() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const courses = {
    Active: ['Mobile Project', 'Sensor Based Mobile Applications'],
    Upcoming: ['Bachelor’s Thesis (Mobile Solutions)'],
    Archived: ['Web Development'],
    All: ['Mobile Project', 'Bachelor’s Thesis (Mobile Solutions)', 'Sensor Based Mobile Applications', 'Web Development'],
  };

  const tabLabels: (keyof typeof courses)[] = ['Active', 'Upcoming', 'Archived', 'All'];
  const selectedCourses = courses[tabLabels[selectedTab]];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: 'transparent',
            border: '1px solid',
            borderColor: '#bfbfbf',
            borderRadius: '0.5rem',
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="course tabs"
            sx={{ borderRadius: '0.5rem', padding: '0.5rem' }}
          >
            {tabLabels.map((label, index) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </AppBar>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {selectedCourses.map((course) => (
            <Grid item xs={12} key={course}>
              <Paper
                elevation={0}
                sx={{
                  padding: 2,
                  border: '1px solid',
                  borderColor: '#bfbfbf',
                  borderRadius: '0.5rem',
                }}
              >
                <Typography variant="h6">{course}</Typography>
                <Typography>Description for {course}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
