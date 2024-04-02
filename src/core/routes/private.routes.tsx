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
import StudentsEditPage from '@/pages/Students/Edit';

const UsersPage = React.lazy(() => import('@/pages/Users'));
const StudentsPage = React.lazy(() => import('@/pages/Students'));
const ClassesPage = React.lazy(() => import('@/pages/Classes'));
const MessagesPage = React.lazy(() => import('@/pages/Messages'));
const RegisterPage = React.lazy(() => import('@/pages/Register'));
const MenuPage = React.lazy(() => import('@/pages/Menu'));
const StudentsCreatePage = React.lazy(() => import('@/pages/Students/Create'));
const ClassroomCreatePage = React.lazy(() => import('@/pages/Classes/Create'));
const ClassroomEditPage = React.lazy(() => import('@/pages/Classes/Edit'));
const RegisterEditPage = React.lazy(() => import('@/pages/Register/Edit'));

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
      element: <Navigate to="users" />,
    },
    {
      path: 'users',
      element: <UsersPage />,
      title: 'Usuários',
      icon: <RiAccountCircleLine />,
    },
    {
      path: 'students',
      element: <StudentsPage />,
      title: 'Alunos',
      icon: <LuBaby />,
    },
    {
      path: 'students/register',
      element: <StudentsCreatePage />,
    },
    {
      path: 'student/:studentId',
      element: <StudentsEditPage />,
    },
    {
      path: 'classes',
      element: <ClassesPage />,
      title: 'Turmas',
      icon: <RiGraduationCapLine />,
    },
    {
      path: 'classroom/register',
      element: <ClassroomCreatePage />,
    },
    {
      path: 'classes/:classesId',
      element: <ClassroomEditPage />,
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
      path: 'register/:registerId',
      element: <RegisterEditPage />,
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
