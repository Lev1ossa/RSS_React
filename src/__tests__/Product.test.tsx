import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductsItem } from '../components/Products/ProductsItem/ProductsItem';
import createFetchMock from 'vitest-fetch-mock';
import userEvent from '@testing-library/user-event';
import { productItem, searchResults, searchResultsLarge } from './mocks';
import { renderWithProviders } from './utils';
import { Products } from '../components/Products/Products';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Card component tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('Card component should renders the relevant card data', () => {
    renderWithProviders(
      <ProductsItem queryChangeHandler={() => {}} item={productItem} />
    );
    const itemTitle = screen.getByText('iPhone 9');
    const itemPrice = screen.getByText('Price: 549');
    const itemCategory = screen.getByText('Category: smartphones');
    expect(itemTitle).toBeDefined();
    expect(itemPrice).toBeDefined();
    expect(itemCategory).toBeDefined();
  });

  test('Clicking on a card should opens a detailed card component', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    render(
      <Products
        queryChangeHandler={() => {}}
        searchResults={searchResultsLarge}
        currentPage={1}
        searchLimit={10}
        detailedProductID={1}
        productData={productItem}
      />
    );
    const products = await screen.findAllByTestId('product');
    const product = products[0];
    expect(product).toBeInTheDocument();
    await userEvent.click(product);
    await screen.findByTestId('detail');
    expect(screen.getByTestId('detail')).toBeInTheDocument();
  });
});
