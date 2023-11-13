import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductsItem } from '../components/Products/ProductsItem/ProductsItem';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../components/App/App';
import createFetchMock from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Card component tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('Card component should renders the relevant card data', () => {
    const productItem = {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
    };

    render(
      <MemoryRouter>
        <ProductsItem item={productItem} />
      </MemoryRouter>
    );
    const itemTitle = screen.getByText('iPhone 9');
    const itemPrice = screen.getByText('Price: 549');
    const itemCategory = screen.getByText('Category: smartphones');
    expect(itemTitle).toBeDefined();
    expect(itemPrice).toBeDefined();
    expect(itemCategory).toBeDefined();
  });

  test('Clicking on a card should opens a detailed card component', async () => {
    const searchResults = {
      limit: 20,
      skip: 0,
      total: 1,
      products: [
        {
          id: 1,
          title: 'iPhone 9',
          description: 'An apple mobile which is nothing like apple',
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: 'Apple',
          category: 'smartphones',
          images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
        },
      ],
    };

    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);

    const products = await screen.findAllByTestId('product');
    const product = products[0];
    expect(product).toBeInTheDocument();
    expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
    await userEvent.click(product);
    await screen.findByTestId('detail');
    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });

  test('Clicking on a card should triggers an additional API call to fetch detailed information', async () => {
    const searchResults = {
      limit: 20,
      skip: 0,
      total: 1,
      products: [
        {
          id: 1,
          title: 'iPhone 9',
          description: 'An apple mobile which is nothing like apple',
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: 'Apple',
          category: 'smartphones',
          images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
        },
      ],
    };

    fetchMock.mockResponse(JSON.stringify(searchResults));

    render(<App />);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const products = await screen.findAllByTestId('product');
    const product = products[0];
    expect(product).toBeInTheDocument();
    await userEvent.click(product);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
