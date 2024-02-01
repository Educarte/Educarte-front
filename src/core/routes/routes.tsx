import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public.routes';
import { privateRoutes } from './private.routes';

const router = createBrowserRouter([{ ...publicRoutes }, { ...privateRoutes }]);

export function AppRoutesProvider() {
  return <RouterProvider router={router} />;
}
