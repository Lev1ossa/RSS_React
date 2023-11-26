// import { beforeEach, describe, expect, test, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { ProductsItem } from '../components/Products/ProductsItem/ProductsItem';
// import { MemoryRouter } from 'react-router-dom';
// import { App } from '../components/App/App';
// import createFetchMock from 'vitest-fetch-mock';
// import userEvent from '@testing-library/user-event';
// import { productItem, searchResults } from './mocks';
// import { renderWithProviders } from './utils';

// const fetchMock = createFetchMock(vi);
// fetchMock.enableMocks();

// describe('Card component tests', (): void => {
//   beforeEach((): void => {
//     fetchMock.resetMocks();
//   });

//   test('Card component should renders the relevant card data', () => {
//     renderWithProviders(<ProductsItem item={productItem} />);
//     const itemTitle = screen.getByText('iPhone 9');
//     const itemPrice = screen.getByText('Price: 549');
//     const itemCategory = screen.getByText('Category: smartphones');
//     expect(itemTitle).toBeDefined();
//     expect(itemPrice).toBeDefined();
//     expect(itemCategory).toBeDefined();
//   });

//   test('Clicking on a card should opens a detailed card component', async () => {
//     fetchMock.mockResponse(JSON.stringify(searchResults));
//     render(<App />);
//     const products = await screen.findAllByTestId('product');
//     const product = products[0];
//     expect(product).toBeInTheDocument();
//     expect(screen.queryByTestId('detail')).not.toBeInTheDocument();
//     await userEvent.click(product);
//     await screen.findByTestId('detail');
//     expect(screen.getByTestId('detail')).toBeInTheDocument();
//   });

//   test('Clicking on a card should triggers an additional API call to fetch detailed information', async () => {
//     fetchMock.mockResponse(JSON.stringify(searchResults));
//     renderWithProviders(<App />);
//     expect(fetchMock).toHaveBeenCalledTimes(0);
//     const products = await screen.findAllByTestId('product');
//     const product = products[0];
//     expect(product).toBeInTheDocument();
//     expect(fetchMock).toHaveBeenCalled();
//   });
// });
