import './App.css';

import { createEmotionCache, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import rtlPlugin from 'stylis-plugin-rtl';

import Loading from './components/UI/Loading';
import useAuth from './hooks/use-auth';
import { globalRoutes } from './routes/globalRoutes';
import { privateRoutes } from './routes/privateRoutes';

// import Hospital from './pages/Hospital';
// import HospitalListPage from './pages/HospitalListPage';

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
});

const App: React.FC = () => {
  const isLoggedIn = useAuth();
  let router;
  if (isLoggedIn === true) {
    router = privateRoutes;
  } else if (isLoggedIn === false) {
    router = globalRoutes;
  } else {
    return null;
  }
  return (
    // <div className='App'>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/' element={<HospitalListPage />} />
    //       <Route path=':id' element={<Hospital />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={rtlCache}
      theme={{ dir: 'rtl' }}
    >
      <NotificationsProvider
        autoClose={4000}
        limit={4}
        position='top-left'
        transitionDuration={500}
      >
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
