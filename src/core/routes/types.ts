import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export type CustomRouteObject = Omit<RouteObject, 'children' | 'index'> & {
  children?: CustomRoute[];
};

export type CustomRoute = CustomRouteObject & {
  title?: string;
  icon?: ReactNode;
};
