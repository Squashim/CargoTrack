import type { NavMenuItem } from '@/types/common';
import { BookSearch, CircleUser, ClipboardList } from 'lucide-react';

const PATHS = {
  AUTH: '/auth',
  USER: '/user',
  HOW_IT_WORKS: '/how-it-works',
};

export const ROUTES = {
  HOME: '/',
  HOW_IT_WORKS: {
    BASE: PATHS.HOW_IT_WORKS,
    RULES: PATHS.HOW_IT_WORKS + '/rules',
    COMPENDIUM: PATHS.HOW_IT_WORKS + '/compendium',
  },
  SCOREBOARD: '/scoreboard',
  AUTH: {
    BASE: PATHS.AUTH,
    LOGIN: PATHS.AUTH + '/login',
    REGISTER: PATHS.AUTH + '/register',
  },
  USER: {
    BASE: PATHS.USER,
    DASHBOARD: PATHS.USER + '/dashboard',
    ACCOUNT: PATHS.USER + '/account',
  },
};

export const availableLanguages = [
  { label: 'Polski', value: 'pl' },
  { label: 'English', value: 'en' },
];

export const NAV_MENU_ITEMS: NavMenuItem[] = [
  {
    title: 'howItWorks.title',
    url: ROUTES.HOW_IT_WORKS.BASE,
    items: [
      {
        title: 'howItWorks.rules.title',
        description: 'howItWorks.rules.description',
        icon: ClipboardList,
        url: ROUTES.HOW_IT_WORKS.RULES,
        allow: 'public',
      },
      {
        title: 'howItWorks.compendium.title',
        description: 'howItWorks.compendium.description',
        icon: BookSearch,
        url: ROUTES.HOW_IT_WORKS.COMPENDIUM,
        allow: 'public',
      },
    ],
  },
  {
    title: 'scoreboard.title',
    url: ROUTES.SCOREBOARD,
    allow: 'public',
  },
];

export const NAV_AUTH_ITEMS: NavMenuItem[] = [
  {
    title: 'userMenu.account',
    icon: CircleUser,
    url: ROUTES.USER.ACCOUNT,
  },
];

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
};
