export interface IUserCard {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
}

export type UserCards = IUserCard[];

export type State = {
  userCards: UserCards;
  countries: string[];
};

export interface iRegistrationData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  tc?: string | undefined;
  gender: string;
  country: string;
  image: FileList;
}

export interface IErrors {
  name: string[];
  age: string[];
  email: string[];
  password: string[] | null;
  confirmPassword: string[];
  gender: string[];
  country: string[];
  image: string[];
  tc: string[];
}
