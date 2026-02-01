import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';


const useScrollToTopOnNav = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 
};

export default useScrollToTopOnNav;