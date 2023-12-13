import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox } from '@/components/styled';
import { title } from '@/config';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
import { useUser } from '@/store/user/UserContext';
import { useLogout } from '@/utils/handleLogout';

function Header() {
  const [, sidebarActions] = useSidebar();
  const [, notificationsActions] = useNotifications();

  const logout = useLogout();
  const { fullName, userRole } = useUser();

  const handleLogoutClick = async () => {
    await logout();
  };

  function showNotification() {
    notificationsActions.push({
      options: {
        content: (
          <Alert severity="info">
            <AlertTitle>Hello, {fullName}. Your role: {userRole}.</AlertTitle>
          </Alert>
        ),
        autoHideDuration: 3000,
      },
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="transparent"
        sx={{ borderRadius: '0 0 1rem 1rem', boxShadow: '0 0 5px rgba(0,0,0,0.5)' }}
        position="static"
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={showNotification} color="primary">
              {title}
            </Button>
          </FlexBox>
          <FlexBox>
            <Tooltip TransitionComponent={Fade} title="Your Account" arrow>
              <IconButton color="primary" size="large" component="a">
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip TransitionComponent={Fade} title="Log Out" arrow>
              <IconButton color="primary" size="large" component="a" onClick={handleLogoutClick}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
