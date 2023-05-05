import { useEffect, RefObject } from 'react';

export default function useResize(echartRef: RefObject<HTMLDivElement>) {
  const autoSize = () => {
    let echartsInstance = window.echarts.getInstanceByDom(echartRef.current);
    echartsInstance && echartsInstance.resize();
  };
  useEffect(() => {
    window.addEventListener('resize', autoSize, false);
    return () => {
      window.removeEventListener('resize', autoSize, false);
    };
  });
}
