import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';

function App() {
  return (
    <div
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/background.jpeg")'
        }}
        >
          <Fragment>
          <CssBaseline />
          <Notifications />
          <HotKeys />
          <SW />
          <BrowserRouter>
            <Header />
            <Sidebar />
            <Pages />
          </BrowserRouter>
          </Fragment>
          </div>
        );
      }

      export default withErrorHandler(App, AppErrorBoundaryFallback);
