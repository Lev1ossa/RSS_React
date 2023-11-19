import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { renderWithProviders } from './utils';
import createFetchMock from 'vitest-fetch-mock';
import { searchResultsLarge } from './mocks';
import { App } from '../components/App/App';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('Products list tests', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Should renders the specified number of cards', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResultsLarge));
    renderWithProviders(<App />);
    await screen.findAllByAltText('product image');
    const elementsArr = screen.getAllByAltText('product image');
    expect(elementsArr.length).toEqual(3);
  });

  test('Should render nothing found message', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    const nothingFoundMessage = screen.getByText('Nothing found, try again!');
    expect(nothingFoundMessage).toBeDefined();
  });
});
