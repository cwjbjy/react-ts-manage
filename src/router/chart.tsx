import { lazy } from 'react';

import * as path from '../settings/routerMap';

const CommonChart = lazy(() => import(/* webpackChunkName: "chart_common" */ '@/pages/chart/common'));
const PositionChart = lazy(() => import(/* webpackChunkName: "chart_position" */ '@/pages/chart/position'));
const FoldChart = lazy(() => import(/* webpackChunkName: "chart_fold" */ '@/pages/chart/fold'));

const chart = [
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
];

export default chart;
