
import { AppBar, Box, Grid, Paper, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

function Page5() {

  const studentName = 'Firstname Lastname'
  const topic = 'DT'
  const dates = ['1.12.2023','2.12.2023','3.12.2023',];


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
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {topic}
            </Typography>
            <Typography variant="h6" component="div">
              {studentName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {dates.map((date) => (
            <Grid item xs={12} key={date}>
              <Paper
                elevation={0}
                sx={{
                  padding: 2,
                  border: '1px solid',
                  borderColor: '#bfbfbf',
                  borderRadius: '0.5rem',
                }}
              >
                <Typography variant="h6">{date}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}


export default Page5;