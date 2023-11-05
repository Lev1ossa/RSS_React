export type ResultItemType = {
  // name: string;
  // height: string;
  // hair_color: string;
  // skin_color: string;
  // eye_color: string;
  // birth_year: string;
  // gender: string;
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

export type ResultItemsType = ResultItemType[];

export type ResultResponse = {
  // count: number;
  // next: null | string;
  // previous: null | string;
  // results: ResultItemsType;
  limit: number;
  skip: number;
  total: number;
  products: ResultItemsType;
};

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}
