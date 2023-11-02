import Bowser from 'bowser';

import { onRouterChange } from './onRouter';
import { getTime } from './share';

import { trackWeb } from '@/apis/user';
class Track {
  constructor() {
    this.info = {};
    this.browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
  }
  start() {
    if (this.started) {
      return;
    }
    this.started = true;
    this.addProperties({
      vs: 'react-manage',
      deviceType: this.browser,
      url: window.location.href,
      referer: document.referrer,
    });
    let visitTime = Date.now();
    onRouterChange((referrer) => {
      const currentTime = Date.now();
      this.addProperties({
        url: window.location.href,
        referer: referrer,
        delay: currentTime - visitTime,
      });
      visitTime = currentTime;
    });
  }
  /* 追踪单页面 */
  trackSinglePage() {
    if (!this.started) {
      throw new Error('[Track Error]: Track has not started yet, please use `track.start()` to start Track');
    }
    this.send();
  }
  send() {
    this.addProperties({
      localTime: getTime(),
    });

    /* 发送数据 */
    trackWeb({ data: JSON.stringify(this.info) });
  }
  addProperties(props) {
    Object.assign(this.info, props);
  }
}

const track = new Track();

export default track;
