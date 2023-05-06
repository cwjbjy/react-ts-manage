declare module '*.css';
declare module '*.png';
declare module '*.jpg';

declare interface Window {
  echarts: any;
  GVerify: any;
  go: any;
}

declare module 'react-i18next';
declare module 'i18next';
declare module 'react-beautiful-dnd';

declare interface UserInfo {
  flag?: boolean;
  passWord: string;
  userName: string;
}

interface ModelData {
  xAxis: string[];
  series: number[];
}

type ThemeType = 'theme-gray' | 'theme-blue' | 'theme-black';

declare interface EchartsProps {
  theme: ThemeType;
  model?: ModelData;
}

interface ObjectItem {
  [key: string]: any;
}
