import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../Pages/NotFound/NotFoundPage';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { MainPage } from '../Pages/Main/MainPage';
import { ProductsDetailed } from '../components/Products/ProductDetailed/ProductDetailed';

test('404 page should be displayed when navigating to an invalid route', async () => {
  const router = createMemoryRouter(
    [
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
    ],
    {
      initialEntries: ['/page-is-not-exist'],
    }
  );
  render(<RouterProvider router={router} />);

  expect(screen.getByText('NOT FOUND!')).toBeInTheDocument();
});
