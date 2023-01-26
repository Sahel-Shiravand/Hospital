import { useEffect } from 'react';

import { useStore } from '../store';

const useAuth = () => {
  const checkAuth = useStore((state) => state.checkAuth);
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    checkAuth();
  }, []);

  return isLoggedIn;
};

export default useAuth;
