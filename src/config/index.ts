import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'Metropolia Attendance App';

const email = 'ivan.gromov@metropolia.fi';

const repository = 'https://github.com/gromov-ivan/attendance-app';

const messages = {
  app: {
    crash: {
      title: 'Unfortunately, the application has crashed. You can:',
      options: {
        email: `Contact with author by this email: ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  loader: {
    fail: 'Something went wrong during loading. Please, try again later.',
  },
  images: {
    failed: 'Something went wrong during image loading.',
  },
  404: 'Page not found.',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  delay: 300,
  minimumLoading: 700,
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Metropolia University of Applied Sciences Attendance App',
};

export { loader, notifications, dateFormat, messages, repository, email, title, defaultMetaTags };
