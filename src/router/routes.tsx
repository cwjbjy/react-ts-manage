import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/errorBoundary';

import * as path from '../settings/routerMap';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/login/index'));
const HomeLayout = lazy(() => import(/* webpackChunkName: "homeLayout" */ '@/layout/index'));

const HomePage = lazy(() => import(/* webpackChunkName: "homePage" */ '@/pages/homePage/index'));
const FleetLine = lazy(() => import(/* webpackChunkName: "fleetLine" */ '@/pages/fleetLine/index'));
const FileUp = lazy(() => import(/* webpackChunkName: "fileUp" */ '@/pages/fileUp'));

const PdfPreview = lazy(() => import(/* webpackChunkName: "PdfPreview" */ '@/pages/pdf'));
const BaseEchart = lazy(() => import(/* webpackChunkName: "baseEchart" */ '@/pages/baseEchart/index'));
const BaseTable = lazy(() => import(/* webpackChunkName: "baseTable" */ '@/pages/baseTable'));
const DragList = lazy(() => import(/* webpackChunkName: "DragList" */ '@/pages/drag/list/index'));
const DragDialog = lazy(() => import(/* webpackChunkName: "DragDialog" */ '@/pages/drag/dialog/index'));
const I18n = lazy(() => import(/* webpackChunkName: "I18n" */ '@/pages/i18n'));
const CommonChart = lazy(() => import(/* webpackChunkName: "chart_common" */ '@/pages/chart/common'));
const PositionChart = lazy(() => import(/* webpackChunkName: "chart_position" */ '@/pages/chart/position'));
const FoldChart = lazy(() => import(/* webpackChunkName: "chart_fold" */ '@/pages/chart/fold'));
const ChatRoom = lazy(() => import(/* webpackChunkName: "chatRoom" */ '@/pages/chatRoom'));
const Magnifying = lazy(() => import(/* webpackChunkName: "magnifying" */ '@/pages/magnifying'));
const UserManage = lazy(() => import(/* webpackChunkName: "userManage" */ '@/pages/userManage/index'));

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
        path: path.DRAG_LIST,
        element: <DragList />,
      },
      {
        path: path.DRAG_DIALOG,
        element: <DragDialog />,
      },
      {
        path: path.I18N,
        element: <I18n />,
      },
      {
        path: path.COMMON_CHART,
        element: <CommonChart />,
      },
      {
        path: path.POSITION_CHART,
        element: <PositionChart />,
      },
      {
        path: path.FLOD_CHART,
        element: <FoldChart />,
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
