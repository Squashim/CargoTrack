const PATHS = {
  AUTH: '/auth',
  USER: '/user',
};

export const ROUTES = {
  HOME: '/',
  AUTH: {
    BASE: PATHS.AUTH,
    LOGIN: PATHS.AUTH + '/login',
    REGISTER: PATHS.AUTH + '/register',
  },
  USER: {
    BASE: PATHS.USER,
    DASHBOARD: PATHS.USER + '/dashboard',
  },
};
