import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { App } from '../components/App/App';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { searchResults } from './mocks';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('pagination test', (): void => {
  beforeEach((): void => {
    fetchMock.resetMocks();
  });
  test('Component should update URL query parameter when page changes', async () => {
    fetchMock.mockResponse(JSON.stringify(searchResults));
    render(<App />);
    expect(location.search).to.equal('');
    const nextpage = await screen.findByTestId('nextpage');
    await userEvent.click(nextpage);
    const prevpage = await screen.findByTestId('prevpage');
    expect(location.search).to.equal('?page=2');
    await userEvent.click(prevpage);
    expect(location.search).to.equal('');
  });
});
