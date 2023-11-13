import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { searchResults } from './mocks';
import { Search } from '../components/Search/Search';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../components/App/Context/AppContext';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('search test', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Component should update URL query parameter when page changes', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    render(
      <AppContextProvider>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </AppContextProvider>
    );
    const searchbtn = await screen.findByTestId('searchbtn');
    const searchinput = await screen.findByTestId('searchinput');
    expect(
      localStorage.getItem('lev1ossa-react-components-value')
    ).to.not.equal('iphone');
    await userEvent.type(searchinput, 'iphone');
    await userEvent.click(searchbtn);
    expect(localStorage.getItem('lev1ossa-react-components-value')).to.equal(
      'iphone'
    );
  });

  test('Component should retrieve the value from the local storage upon mounting', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    const { unmount } = render(
      <AppContextProvider>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </AppContextProvider>
    );
    const searchbtn = (await screen.findByTestId(
      'searchbtn'
    )) as HTMLButtonElement;
    const searchinput = (await screen.findByTestId(
      'searchinput'
    )) as HTMLInputElement;
    expect(localStorage.getItem('lev1ossa-react-components-value')).to.equal(
      'iphone'
    );
    expect(searchinput.value).to.equal('iphone');
    await userEvent.clear(searchinput);
    await userEvent.type(searchinput, 'samsung');
    await userEvent.click(searchbtn);

    unmount();

    expect(localStorage.getItem('lev1ossa-react-components-value')).to.equal(
      'samsung'
    );
    expect(searchinput.value).to.equal('samsung');

    render(
      <AppContextProvider>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </AppContextProvider>
    );
  });
});
