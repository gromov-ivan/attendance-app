import Typography from '@mui/material/Typography';
import { AppBar, Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import React from 'react';

// function Page1() {
//   return (
//     <>
//       <Meta title="page 1" />
//       <FullSizeCenteredFlexBox>
//         <Typography variant="h3">Page 1</Typography>
//       </FullSizeCenteredFlexBox>
//     </>
//   );
// }

function Page1() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // const courses = {
  //   Active: ['Mobile Project', 'Sensor Based Mobile Applications'],
  //   Upcoming: ['Bachelor’s Thesis (Mobile Solutions)'],
  //   Archived: ['Web Development'],
  //   All: ['Mobile Project', 'Bachelor’s Thesis (Mobile Solutions)', 'Sensor Based Mobile Applications', 'Web Development'],
  // };

  // const tabLabels: (keyof typeof courses)[] = ['Active', 'Upcoming', 'Archived', 'All'];
  // const selectedCourses = courses[tabLabels[selectedTab]];

  return (
    <Box sx={{ display: 'flex', 
                height: '100vh', 
                position: 'relative', 
    }}>

      <Box sx={{ flexGrow: 1, p: 3,
      backgroundSize: 'cover',
      backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/background.jpeg")',
      }}>


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
            {/* {tabLabels.map((label, index) => ( */}
              {/* <Tab key={label} label={label} /> */}
            {/* ))} */}
          </Tabs>
        </AppBar>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {/* {selectedCourses.map((course) => ( */}
            {/* <Grid item xs={12} key={course}>
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
            </Grid> */}
          {/* ))} */}
        </Grid>
      </Box>
    </Box>
  );
}

export default Page1;
