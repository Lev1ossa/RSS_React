import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../../../Pages/NotFound/NotFoundPage';
import { MainPage } from '../../../Pages/Main/MainPage';
import { BaseFormPage } from '../../../Pages/BaseFormPage/BaseFormPage';
import { HookFormPage } from '../../../Pages/HookFormPage/HookFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <MainPage /> },
      { path: 'base-form', element: <BaseFormPage /> },
      { path: 'hook-form', element: <HookFormPage /> },
    ],
  },
]);
