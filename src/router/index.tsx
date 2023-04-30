import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/login/index'));
const HomeLayout = lazy(() => import(/* webpackChunkName: "homeLayout" */ '@/layout/index'));

const HomePage = lazy(() => import(/* webpackChunkName: "homePage" */ '@/pages/homePage/index'));
const FleetLine = lazy(() => import(/* webpackChunkName: "fleetLine" */ '@/pages/fleetLine/index'));
const FileUp = lazy(() => import(/* webpackChunkName: "fileUp" */ '@/pages/fileUp/index'));

const PdfPreview = lazy(() => import(/* webpackChunkName: "PdfPreview" */ '@/pages/pdfPreview/index'));
const BaseEchart = lazy(() => import(/* webpackChunkName: "baseEchart" */ '@/pages/baseEchart/index'));
const BaseTable = lazy(() => import(/* webpackChunkName: "baseTable" */ '@/pages/baseTable/index'));
const DragList = lazy(() => import(/* webpackChunkName: "DragList" */ '@/pages/drag/list/index'));
const DragDialog = lazy(() => import(/* webpackChunkName: "DragDialog" */ '@/pages/drag/dialog/index'));
const I18n = lazy(() => import(/* webpackChunkName: "I18n" */ '@/pages/I18n/index'));
const CommonChart = lazy(() => import(/* webpackChunkName: "chart_common" */ '@/pages/chart/common/index'));
const PositionChart = lazy(() => import(/* webpackChunkName: "chart_position" */ '@/pages/chart/position/index'));
const FoldChart = lazy(() => import(/* webpackChunkName: "chart_fold" */ '@/pages/chart/fold/index'));
const ChatRoom = lazy(() => import(/* webpackChunkName: "chatRoom" */ '@/pages/chatRoom/index'));
const Magnifying = lazy(() => import(/* webpackChunkName: "magnifying" */ '@/pages/magnifying/index'));
const UserManage = lazy(() => import(/* webpackChunkName: "userManage" */ '@/pages/userManage/index'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: '/firstItem',
        element: <HomePage />,
      },
      {
        path: '/fleet',
        element: <FleetLine />,
      },
      {
        path: '/fileUp',
        element: <FileUp />,
      },
      {
        path: '/pdf',
        element: <PdfPreview />,
      },
      {
        path: '/baseEcharts',
        element: <BaseEchart />,
      },
      {
        path: '/baseTable',
        element: <BaseTable />,
      },
      {
        path: '/dragList',
        element: <DragList />,
      },
      {
        path: '/dragDialog',
        element: <DragDialog />,
      },
      {
        path: '/I18n',
        element: <I18n />,
      },
      {
        path: '/commonChart',
        element: <CommonChart />,
      },
      {
        path: 'positionChart',
        element: <PositionChart />,
      },
      {
        path: '/foldChart',
        element: <FoldChart />,
      },
      {
        path: '/magnifying',
        element: <Magnifying />,
      },
      {
        path: '/chatRoom',
        element: <ChatRoom />,
      },
      {
        path: '/manage',
        element: <UserManage />,
      },
      {
        path: '/',
        element: (
          <>
            <Navigate to="/firstItem" replace={true} />
          </>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
]);

export default router;
