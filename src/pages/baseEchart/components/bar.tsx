import { useEffect, useRef, memo } from 'react';

import { Chart } from '@/components/layout/chart';

import type { EchartsProps } from '@/types';

import { themeColor } from '@/constant/theme';
import useResize from '@/hooks/useResize';

const Bar = ({ theme }: EchartsProps) => {
  const echart = useRef(null);

  useResize(echart);

  useEffect(() => {
    let myChart;
    myChart = window.echarts.init(echart.current);
    myChart.clear();
    myChart.setOption({
      color: ['#3398DB'],
      title: {
        text: '柱状图',
        left: 'center',
        textStyle: {
          color: themeColor[theme].font,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            alignWithLabel: true,
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisLabel: {
            show: true,
            color: themeColor[theme].font,
          },
          nameTextStyle: {
            color: themeColor[theme].font,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
            lineStyle: {
              color: themeColor[theme].font,
            },
          },
          axisLabel: {
            show: true,
            color: themeColor[theme].font,
          },
          nameTextStyle: {
            color: themeColor[theme].font,
          },
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });
  }, [theme]);

  return <Chart ref={echart}></Chart>;
};

export default memo(Bar);
