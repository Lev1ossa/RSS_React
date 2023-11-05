export type ResultItemType = {
  name: string;
  height: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

export type ResultItemsType = ResultItemType[];

export type ResultResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: ResultItemsType;
};

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}
