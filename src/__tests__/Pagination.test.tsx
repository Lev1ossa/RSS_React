import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { productItem, searchResults } from './mocks';
import MainPage from '../pages';
import mockRouter from 'next-router-mock';
import { renderWithProviders } from './utils';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('pagination test', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Component should update URL query parameter when button next page pressed', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    renderWithProviders(
      <MainPage
        searchResponse={{
          data: searchResults,
          error: undefined,
        }}
        productResponse={{
          data: productItem,
          error: undefined,
        }}
        detailedProductID={1}
        currentPage={1}
        searchLimit={10}
        searchValue={''}
      />
    );
    const nextpage = await screen.findByTestId('nextpage');
    expect(mockRouter.query.page).to.equal(undefined);
    await userEvent.click(nextpage);
    expect(mockRouter.query.page).to.equal('2');
  });
  test('Component should update URL query parameter when button prev page pressed', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    renderWithProviders(
      <MainPage
        searchResponse={{
          data: searchResults,
          error: undefined,
        }}
        productResponse={{
          data: productItem,
          error: undefined,
        }}
        detailedProductID={1}
        currentPage={3}
        searchLimit={10}
        searchValue={''}
      />
    );
    const prevpage = await screen.findByTestId('prevpage');
    await userEvent.click(prevpage);
    expect(mockRouter.query.page).to.equal('2');
  });
});
