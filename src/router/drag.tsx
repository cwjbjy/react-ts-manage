import { lazy } from 'react';

import * as path from '../settings/routerMap';
const DragList = lazy(() => import(/* webpackChunkName: "DragList" */ '@/pages/drag/list'));
const DragDialog = lazy(() => import(/* webpackChunkName: "DragDialog" */ '@/pages/drag/dialog'));

const drag = [
  {
    path: path.DRAG_LIST,
    element: <DragList />,
  },
  {
    path: path.DRAG_DIALOG,
    element: <DragDialog />,
  },
];

export default drag;
