export const productItem = {
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
};

export const searchResults = {
  limit: 10,
  skip: 0,
  total: 100,
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
  ],
};

export const searchResultsLarge = {
  limit: 10,
  skip: 0,
  total: 100,
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

export const searchResultsEmpty = {
  limit: 10,
  skip: 0,
  total: 0,
  products: [],
};

export const mockAppContextLarge = {
  searchLimit: 10,
  searchResults: searchResultsLarge,
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

export const mockAppContext = {
  searchLimit: 10,
  searchResults,
  isLoading: false,
  searchValue: '',
  currentPage: 1,
  detailedProductID: 1,
  setSearchLimit: () => {},
  setSearchResults: () => {},
  setIsLoading: () => {},
  setSearchValue: () => {},
  setCurrentPage: () => {},
  setDetailedProductID: () => {},
  updateProducts: () => {},
};

export const mockAppContextEmpty = {
  searchLimit: 10,
  searchResults: searchResultsEmpty,
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
