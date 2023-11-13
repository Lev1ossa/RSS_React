import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { App } from '../components/App/App';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('pagination test', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Component should update URL query parameter when page changes', async () => {
    const searchResults = {
      limit: 10,
      skip: 0,
      total: 100,
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
    expect(location.search).to.equal('');

    const nextpage = await screen.findByTestId('nextpage');
    await userEvent.click(nextpage);
    const prevpage = await screen.findByTestId('prevpage');
    console.log('hey', location.toString());
    expect(location.search).to.equal('?page=2');
    await userEvent.click(prevpage);
    expect(location.search).to.equal('');
  });
});
