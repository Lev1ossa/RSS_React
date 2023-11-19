export type ResultItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: Array<string>;
};

export type ResultItemsType = ResultItemType[];

export interface IResultResponse {
  limit: number;
  skip: number;
  total: number;
  products: ResultItemsType;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export type OutletContextType = {
  detailedProductID: number;
  detailedProductChangeHandler: (id: number) => void;
};

export type AppContextProps = {
  searchLimit: number;
  searchResults: IResultResponse;
  isLoading: boolean;
  searchValue: string;
  currentPage: number;
  detailedProductID: number;
  setSearchLimit: React.Dispatch<React.SetStateAction<number>>;
  setSearchResults: React.Dispatch<React.SetStateAction<IResultResponse>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setDetailedProductID: React.Dispatch<React.SetStateAction<number>>;
  updateProducts: () => void;
};

export type AppReduxState = {
  searchLimit: number;
  searchResults: IResultResponse;
  isLoading: boolean;
  isProductLoading: boolean;
  searchValue: string;
  currentPage: number;
  detailedProductID: number;
};
