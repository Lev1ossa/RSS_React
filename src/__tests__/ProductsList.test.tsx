import { beforeEach, describe, expect, test, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { renderWithProviders } from './utils';
import createFetchMock from 'vitest-fetch-mock';
import { productItem, searchResultsEmpty, searchResultsLarge } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Products list tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Should renders the specified number of cards', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResultsLarge));
    renderWithProviders(
      <Products
        queryChangeHandler={() => {}}
        searchResults={searchResultsLarge}
        currentPage={1}
        searchLimit={10}
        detailedProductID={0}
        productData={productItem}
      />
    );
    await screen.findAllByAltText('product image');
    const elementsArr = screen.getAllByAltText('product image');
    expect(elementsArr.length).toEqual(3);
  });

  test('Should render nothing found message', async () => {
    renderWithProviders(
      <Products
        queryChangeHandler={() => {}}
        searchResults={searchResultsEmpty}
        currentPage={1}
        searchLimit={10}
        detailedProductID={0}
        productData={productItem}
      />
    );
    const nothingFoundMessage = screen.getByText('Nothing found, try again!');
    expect(nothingFoundMessage).toBeDefined();
  });
});
