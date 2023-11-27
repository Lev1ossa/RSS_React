import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { productItem, searchResults } from './mocks';
import { renderWithProviders } from './utils';
import MainPage from '../pages';
import mockRouter from 'next-router-mock';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('search test', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Component should save search value to query params', async () => {
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
    const searchbtn = await screen.findByTestId('searchbtn');
    const searchinput = await screen.findByTestId('searchinput');
    expect(mockRouter.query.search).to.not.equal('iphone');
    await userEvent.clear(searchinput);
    await userEvent.type(searchinput, 'iphone');
    await userEvent.click(searchbtn);
    expect(mockRouter.query.search).to.equal('iphone');
  });
});
