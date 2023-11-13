import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { App } from '../components/App/App';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../components/App/Context/AppContext';
import { ProductsDetailed } from '../components/Products/ProductDetailed/ProductDetailed';
import { mockAppContext, searchResults } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Card detailed tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('Clicking on close button should close detailed card', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);

    const products = await screen.findAllByTestId('product');
    const product = products[0];
    expect(product).toBeInTheDocument();
    expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
    await userEvent.click(product);
    await screen.findByTestId('detail');
    expect(screen.getByTestId('detail')).toBeInTheDocument();
    const closeButton = screen.getByTestId('closeButton');
    await userEvent.click(closeButton);
    expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
  });

  test('Card component should render the relevant card data', async () => {
    fetchMock.disableMocks();

    render(
      <AppContext.Provider value={mockAppContext}>
        <MemoryRouter>
          <ProductsDetailed />
        </MemoryRouter>
      </AppContext.Provider>
    );
    const itemCategory = await screen.findByText(
      'Description: An apple mobile which is nothing like apple'
    );
    expect(itemCategory).toBeDefined();
  });

  test('loading indicator should be displayed while fetching data', async () => {
    fetchMock.enableMocks();

    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);

    const products = await screen.findAllByTestId('product');
    const product = products[0];
    expect(product).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    userEvent.click(product);
    const loader = await screen.findByTestId('loader');
    expect(loader).toBeDefined();
  });
});
