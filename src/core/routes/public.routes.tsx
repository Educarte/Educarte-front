import React from 'react';
import { PublicLayout } from '@/layouts/Public';
import { CustomRoute } from './types';
import { errorRoutes } from './error.routes';

const HomePage = React.lazy(() => import('@/pages/Home'));
const LoginPage = React.lazy(() => import('@/pages/Login'));
const ForgotPage = React.lazy(() => import('@/pages/Forgot'));
const ResetPage = React.lazy(() => import('@/pages/Reset'));
const PrivacyPage = React.lazy(() => import('@/pages/Privacy'));

export const publicRoutes: CustomRoute = {
  path: '/',
  element: <PublicLayout />,
  children: [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'forgot',
      element: <ForgotPage />,
    },
    {
      path: 'resetPassword/:code',
      element: <ResetPage />,
    },
    {
      path: 'privacy',
      element: <PrivacyPage />,
    },
    ...errorRoutes,
  ],
};
