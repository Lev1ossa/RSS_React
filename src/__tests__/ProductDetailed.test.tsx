import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { ProductsDetailed } from '../components/Products/ProductDetailed/ProductDetailed';
import { productItem } from './mocks';
import { renderWithProviders } from './utils';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Card detailed tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  test('Card component should render the relevant card data', async () => {
    fetchMock.mockResponse(JSON.stringify(productItem));
    renderWithProviders(
      <ProductsDetailed
        queryChangeHandler={() => {}}
        productData={productItem}
      />
    );
    const itemCategory = await screen.findByText(
      'Description: An apple mobile which is nothing like apple'
    );
    expect(itemCategory).toBeDefined();
  });
});
