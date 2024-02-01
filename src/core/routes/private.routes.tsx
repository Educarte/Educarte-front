import React from 'react';
import { Navigate } from 'react-router-dom';

import { PrivateLayout } from '@/layouts/Private';
import { errorRoutes } from './error.routes';
import { CustomRoute } from './types';
import { RiAccountCircleLine, RiGraduationCapLine } from 'react-icons/ri';
import { IoMdAlarm } from 'react-icons/io';
import { MdOutlineChat } from 'react-icons/md';
import { LuBaby } from 'react-icons/lu';
import { LiaAppleAltSolid } from 'react-icons/lia';

const EmployeessPage = React.lazy(() => import('@/pages/Employees'));
const StudentsPage = React.lazy(() => import('@/pages/Students'));
const ClassesPage = React.lazy(() => import('@/pages/Classes'));
const MessagesPage = React.lazy(() => import('@/pages/Messages'));
const RegisterPage = React.lazy(() => import('@/pages/Register'));
const MenuPage = React.lazy(() => import('@/pages/Menu'));
// const LocationCreatePage = React.lazy(() => import('@/pages/Locations/Create'));
// const LocationDetailsPage = React.lazy(
//   () => import('@/pages/Locations/Details')
// );

export const privateRoutes: CustomRoute = {
  path: 'app',
  element: <PrivateLayout />,
  children: [
    {
      path: 'app',
      element: <Navigate to="employees" />,
    },
    {
      path: 'employees',
      element: <EmployeessPage />,
      title: 'Colaboradores',
      icon: <RiAccountCircleLine />,
    },
    {
      path: 'students',
      element: <StudentsPage />,
      title: 'Alunos',
      icon: <LuBaby />,
    },
    {
      path: 'classes',
      element: <ClassesPage />,
      title: 'Turmas',
      icon: <RiGraduationCapLine />,
    },
    {
      path: 'messages',
      element: <MessagesPage />,
      title: 'Recados',
      icon: <MdOutlineChat />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
      title: 'Controle de Entradas e Saída',
      icon: <IoMdAlarm />,
    },
    {
      path: 'menu',
      element: <MenuPage />,
      title: 'Cardápio',
      icon: <LiaAppleAltSolid />,
    },
    ...errorRoutes,
  ],
};
