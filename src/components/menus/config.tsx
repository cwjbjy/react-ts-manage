import BaseTable from '@/assets/images/menus/baseTable.png';
import Chat from '@/assets/images/menus/chat.png';
import Drag from '@/assets/images/menus/drag.png';
import Echarts from '@/assets/images/menus/echarts.png';
import ChinaMap from '@/assets/images/menus/echarts_heatmap.png';
import FlowChart from '@/assets/images/menus/flowChart.png';
import Home from '@/assets/images/menus/home.png';
import I18n from '@/assets/images/menus/I18n.png';
import Magnifying from '@/assets/images/menus/magnifying.png';
import Manage from '@/assets/images/menus/manage.png';
import Pdf from '@/assets/images/menus/pdf.png';
import Upload from '@/assets/images/menus/upload.png';

import './config.scss';

import type { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export const menus: MenuItem[] = [
  {
    label: '系统首页',
    key: '/firstItem',
    icon: <img src={Home} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '模拟航线',
    key: '/fleet',
    icon: <img src={ChinaMap} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '图片上传',
    key: '/fileUp',
    icon: <img src={Upload} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '文件预览',
    key: '/pdf',
    icon: <img src={Pdf} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '基础图表',
    key: '/baseEcharts',
    icon: <img src={Echarts} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '基础表格',
    key: '/baseTable',
    icon: <img src={BaseTable} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '拖拽组件',
    key: '/drag',
    icon: <img src={Drag} alt="加载失败" className="menuIcon"></img>,
    children: [
      {
        label: '拖拽列表',
        key: '/dragList',
      },
      {
        label: '拖拽弹框',
        key: '/dragDialog',
      },
    ],
  },
  {
    label: '语言转换',
    icon: <img src={I18n} alt="加载失败" className="menuIcon"></img>,
    key: '/I18n',
  },
  {
    label: '流程图',
    key: '/flowChart',
    icon: <img src={FlowChart} alt="加载失败" className="menuIcon"></img>,
    children: [
      {
        label: '一般流程图',
        key: '/commonChart',
      },
      {
        label: '定位流程图',
        key: '/positionChart',
      },
      {
        label: '折叠流程图',
        key: '/foldChart',
      },
    ],
  },
  {
    label: '放大镜',
    key: '/magnifying',
    icon: <img src={Magnifying} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '聊天室',
    key: '/chatRoom',
    icon: <img src={Chat} alt="加载失败" className="menuIcon"></img>,
  },
  {
    label: '后台管理',
    key: '/manage',
    icon: <img src={Manage} alt="加载失败" className="menuIcon"></img>,
  },
];
