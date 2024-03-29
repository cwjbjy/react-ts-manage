import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';

import * as path from '../settings/routerMap';

import chart from './chart';
import drag from './drag';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/login'));
const HomeLayout = lazy(() => import(/* webpackChunkName: "homeLayout" */ '@/layout'));

const HomePage = lazy(() => import(/* webpackChunkName: "homePage" */ '@/pages/homePage'));
const FleetLine = lazy(() => import(/* webpackChunkName: "fleetLine" */ '@/pages/fleetLine'));
const FileUp = lazy(() => import(/* webpackChunkName: "fileUp" */ '@/pages/fileUp'));

const PdfPreview = lazy(() => import(/* webpackChunkName: "PdfPreview" */ '@/pages/pdf'));
const BaseEchart = lazy(() => import(/* webpackChunkName: "baseEchart" */ '@/pages/baseEchart'));
const BaseTable = lazy(() => import(/* webpackChunkName: "baseTable" */ '@/pages/baseTable'));
const I18n = lazy(() => import(/* webpackChunkName: "I18n" */ '@/pages/i18n'));

const ChatRoom = lazy(() => import(/* webpackChunkName: "chatRoom" */ '@/pages/chatRoom'));
const Magnifying = lazy(() => import(/* webpackChunkName: "magnifying" */ '@/pages/magnifying'));
const UserManage = lazy(() => import(/* webpackChunkName: "userManage" */ '@/pages/userManage'));

const routes = [
  {
    path: path.LOGIN,
    element: <Login />,
  },
  {
    element: <HomeLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: path.FIRSTITEM,
        element: <HomePage />,
      },
      {
        path: path.FLEET,
        element: <FleetLine />,
      },
      {
        path: path.FILUP,
        element: <FileUp />,
      },
      {
        path: path.PDF,
        element: <PdfPreview />,
      },
      {
        path: path.BASE_ECHARTS,
        element: <BaseEchart />,
      },
      {
        path: path.BASE_TABLE,
        element: <BaseTable />,
      },
      {
        path: path.I18N,
        element: <I18n />,
      },
      {
        path: path.MAGNIFYING,
        element: <Magnifying />,
      },
      {
        path: path.CHARTROOM,
        element: <ChatRoom />,
      },
      {
        path: path.MANAGE,
        element: <UserManage />,
      },
      ...chart,
      ...drag,
      {
        path: '/',
        element: (
          <>
            <Navigate to={path.FIRSTITEM} replace={true} />
          </>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
];

export default routes;
