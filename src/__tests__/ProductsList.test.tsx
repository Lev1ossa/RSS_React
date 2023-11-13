import { expect, test } from 'vitest';
import { ProductsContainer } from '../components/Products/ProductsContainer/ProductsContainer';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../components/App/Context/AppContext';
import { render, screen } from '@testing-library/react';
import { Products } from '../components/Products/Products';
import { mockAppContextEmpty, mockAppContextLarge } from './mocks';

test('Should renders the specified number of cards', async () => {
  render(
    <AppContext.Provider value={mockAppContextLarge}>
      <MemoryRouter>
        <ProductsContainer />
      </MemoryRouter>
    </AppContext.Provider>
  );

  await screen.findAllByAltText('product image');
  const elementsArr = screen.getAllByAltText('product image');
  expect(elementsArr.length).toEqual(3);
});

test('Should render nothing found message', async () => {
  render(
    <AppContext.Provider value={mockAppContextEmpty}>
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </AppContext.Provider>
  );

  const nothingFoundMessage = screen.getByText('Nothing found, try again!');
  expect(nothingFoundMessage).toBeDefined();
});
