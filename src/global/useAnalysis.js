import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import track from '../utils/track';

track.start();

export default function useAnalysis() {
  const location = useLocation();
  useEffect(() => {
    track.trackSinglePage();
  }, [location.pathname, location.search, location.hash]);
}
