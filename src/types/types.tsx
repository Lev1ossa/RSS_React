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

export type AppReduxState = {
  searchLimit: number;
  searchResults: IResultResponse;
  isLoading: boolean;
  isProductLoading: boolean;
  searchValue: string;
  currentPage: number;
  detailedProductID: number;
};

export type GetProductsProps = {
  searchValue: string;
  currentPage: number;
  limit: number;
};
