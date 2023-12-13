import { useEffect, useRef } from 'react';

import { SnackbarKey, useSnackbar } from 'notistack';

import useNotifications from '@/store/notifications';

function Notifier() {
  const [notifications, actions] = useNotifications();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const displayed = useRef<SnackbarKey[]>([]);

  function storeDisplayed(key: SnackbarKey) {
    displayed.current = [...displayed.current, key];
  }

  function removeDisplayed(key: SnackbarKey) {
    displayed.current = [...displayed.current.filter((_key) => key !== _key)];
  }

  useEffect(() => {
    notifications.forEach(({ message, options, dismissed }) => {
      if (dismissed) {
        closeSnackbar(options.key);
        return;
      }

      if (options.key && displayed.current.includes(options.key)) return;

      enqueueSnackbar(message, {
        ...options,
        onExited(event, key) {
          actions.remove(key);
          removeDisplayed(key);
        },
      });

      options.key && storeDisplayed(options.key);
    });
  });

  return null;
}

export default Notifier;
