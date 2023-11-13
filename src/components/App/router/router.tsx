import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../../Pages/Main/MainPage';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { ProductsDetailed } from '../../Products/ProductDetailed/ProductDetailed';
import { NotFoundPage } from '../../../Pages/NotFound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
        children: [
          {
            path: '',
            element: <ProductsDetailed />,
          },
        ],
      },
    ],
  },
]);
