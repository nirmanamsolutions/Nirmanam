import { useEffect } from 'react';
import { siteContent } from '../data/siteContent';

export function useTabTitle() {
  useEffect(() => {
    const originalTitle = siteContent.meta.title;
    const tabAwayTitle = siteContent.meta.tabAwayTitle;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = tabAwayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
