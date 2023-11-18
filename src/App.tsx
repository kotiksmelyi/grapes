import './App.css';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MapsPage } from './pages/home/MapsPage';
import { ListPage } from './pages/analytics/ListPage';
import { useEffect } from 'react';
import { dashboard } from './store/dataStore';
import { ChartsPage } from './pages/charts/ChartsPage';
import { ArchivePage } from './pages/archive/ArchivePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MapsPage />,
    index: true,
  },
  {
    path: '/list',
    element: <ListPage />,
  },
  {
    path: '/charts',
    element: <ChartsPage />,
  },
  {
    path: '/archive',
    element: <ArchivePage />,
  },
]);

function App() {
  useEffect(() => {
    dashboard.fetchFeatureFx();
    dashboard.fetchRegionsFx();
  }, [dashboard.fetchFeatureFx, dashboard.fetchRegionsFx]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8C64D8',
          colorText: '#252525',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
