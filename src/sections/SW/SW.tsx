import { useCallback, useEffect, useRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';

import useNotifications from '@/store/notifications';

function SW() {
  const [, notificationsActions] = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    if (offlineReady) {
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App can be installed.</Alert>,
        },
      });
    } else if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: 'New content is available, click on reload button to update.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button sx={{ color: '#fff' }} onClick={() => updateServiceWorker(true)}>
                Reload
              </Button>
              <Button sx={{ color: '#fff' }} onClick={close}>
                Close
              </Button>
            </>
          ),
        },
      });
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

  return null;
}

export default SW;
