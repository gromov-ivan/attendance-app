import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LanguageIcon from '@mui/icons-material/Language';
//import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
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
import useHotKeysDialog from '@/store/hotkeys';
import useNotifications from '@/store/notifications';
import useSidebar from '@/store/sidebar';
//import useTheme from '@/store/theme';

import { HotKeysButton } from './styled';
import { Fade } from '@mui/material';

function Header() {
  const [, sidebarActions] = useSidebar();
  //const [, themeActions] = useTheme();
  const [, notificationsActions] = useNotifications();
  const [, hotKeysDialogActions] = useHotKeysDialog();

  function showNotification() {
    notificationsActions.push({
      options: {
        content: (
          <Alert severity="info">
            <AlertTitle>Welcome to the Attendance App!</AlertTitle>
          </Alert>
        ),
        autoHideDuration: 3000,
      },
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
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
            <FlexBox>
              <Tooltip TransitionComponent={Fade} title="Hot keys" arrow>
                <HotKeysButton
                  size="small"
                  variant="outlined"
                  aria-label="open hotkeys dialog"
                  onClick={hotKeysDialogActions.open}
                >
                  alt + /
                </HotKeysButton>
              </Tooltip>
            </FlexBox>
            <Divider orientation="vertical" flexItem />
            <Tooltip TransitionComponent={Fade} title="Language" arrow>
              <IconButton color="primary" size="large" component="a">
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem />
            <Tooltip TransitionComponent={Fade} title="Profile" arrow>
              <IconButton color="primary" size="large" component="a">
                <AccountBoxIcon />
              </IconButton>
            </Tooltip>
            {/*
            <Tooltip TransitionComponent={Fade} title="Switch theme" arrow>
              <IconButton color="primary" edge="end" size="large" onClick={themeActions.toggle}>
                <ThemeIcon />
              </IconButton>
            </Tooltip>
            */}
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
