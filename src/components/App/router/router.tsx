import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../../../Pages/NotFound/NotFoundPage';
import { MainPage } from '../../../Pages/Main/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [{ path: '', element: <MainPage /> }],
  },
]);
