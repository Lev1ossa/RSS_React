import { expect, test } from 'vitest';
import { ProductsContainer } from '../components/Products/ProductsContainer/ProductsContainer';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../components/App/Context/AppContext';
import { render, screen } from '@testing-library/react';
import { Products } from '../components/Products/Products';

test('Should renders the specified number of cards', async () => {
  const searchResults = {
    limit: 10,
    skip: 0,
    total: 0,
    products: [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
      },
      {
        id: 2,
        title: 'iPhone X',
        description:
          'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12',
        price: 899,
        discountPercentage: 17.94,
        rating: 4.44,
        stock: 34,
        brand: 'Apple',
        category: 'smartphones',
        images: ['https://i.dummyjson.com/data/products/2/thumbnail.jpg'],
      },
      {
        id: 3,
        title: 'Samsung Universe 9',
        description:
          'Samsungs new variant which goes beyond Galaxy to the Universe',
        price: 1249,
        discountPercentage: 15.46,
        rating: 4.09,
        stock: 36,
        brand: 'Samsung',
        category: 'smartphones',
        images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
      },
    ],
  };

  const mockAppContext = {
    searchLimit: 10,
    searchResults,
    isLoading: false,
    searchValue: '',
    currentPage: 1,
    detailedProductID: 0,
    setSearchLimit: () => {},
    setSearchResults: () => {},
    setIsLoading: () => {},
    setSearchValue: () => {},
    setCurrentPage: () => {},
    setDetailedProductID: () => {},
    updateProducts: () => {},
  };

  render(
    <AppContext.Provider value={mockAppContext}>
      <MemoryRouter>
        <ProductsContainer />
      </MemoryRouter>
    </AppContext.Provider>
  );

  await screen.findAllByAltText('product image');
  const elementsArr = screen.getAllByAltText('product image');
  expect(elementsArr.length).toEqual(3);
});

test('Should renders the specified number of cards', async () => {
  const searchResults = {
    limit: 10,
    skip: 0,
    total: 0,
    products: [],
  };

  const mockAppContext = {
    searchLimit: 10,
    searchResults,
    isLoading: false,
    searchValue: '',
    currentPage: 1,
    detailedProductID: 0,
    setSearchLimit: () => {},
    setSearchResults: () => {},
    setIsLoading: () => {},
    setSearchValue: () => {},
    setCurrentPage: () => {},
    setDetailedProductID: () => {},
    updateProducts: () => {},
  };

  render(
    <AppContext.Provider value={mockAppContext}>
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </AppContext.Provider>
  );

  const nothingFoundMessage = screen.getByText('Nothing found, try again!');
  expect(nothingFoundMessage).toBeDefined();
});
