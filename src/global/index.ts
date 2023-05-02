import useAnalysis from './useAnalysis.js';
import useVersion from './useVersion';

export default function Global() {
  useVersion(); //版本更新提示
  useAnalysis(); // 数据埋点
  return null;
}
