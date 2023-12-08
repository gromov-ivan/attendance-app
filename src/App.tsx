import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Header from '@/sections/Header';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';

import Pages from './routes/Pages';
import HotKeys from './sections/HotKeys';
import { UserProvider, useUser } from './store/user/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <CssBaseline />
        <Notifications />
        <SW />
        <MainContent />
      </BrowserRouter>
    </UserProvider>
  );
}

const MainContent = () => {
  const { session } = useUser();

  return (
    <>
      {session && <HotKeys />}
      {session && <Header />}
      {session && <Sidebar />}
      <Pages />
    </>
  );
};

export default withErrorHandler(App, AppErrorBoundaryFallback);
