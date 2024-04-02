import React from 'react';
import { CustomRoute } from './types';

const ForbiddenPage = React.lazy(() => import('@/pages/Errors/Forbidden'));
const InternalErrorPage = React.lazy(
  () => import('@/pages/Errors/InternalError')
);
const NotFoundPage = React.lazy(() => import('@/pages/Errors/NotFound'));

export const errorRoutes: CustomRoute[] = [
  {
    path: 'forbidden',
    element: <ForbiddenPage />,
  },
  {
    path: 'internal-error',
    element: <InternalErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
