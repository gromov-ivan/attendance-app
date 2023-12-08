import { Link } from 'react-router-dom';

import DefaultIcon from '@mui/icons-material/Deblur';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { studentRoutes, teacherRoutes } from '@/routes';
import useSidebar from '@/store/sidebar';
import { useUser } from '@/store/user/UserContext';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const { userRole } = useUser();

  const roleRoutes = userRole === 'teacher' ? teacherRoutes : studentRoutes;
  const basePath = userRole === 'teacher' ? '/teacher' : '/student';

  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={sidebarActions.close}
      onOpen={sidebarActions.open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {Object.values(roleRoutes).map(({ path, title, icon: Icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={Link}
              to={`${basePath}${path}`}
              onClick={sidebarActions.close}
            >
              <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
}

export default Sidebar;
