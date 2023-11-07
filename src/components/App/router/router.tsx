import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../../../Pages/Main/MainPage';
import { ErrorBoundary } from '../../ErrorBoundary/ErrorBoundary';
import { ProductsDetailed } from '../../Products/ProductDetailed/ProductDetailed';

export const router = createBrowserRouter([
  {
    path: '/',
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
