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
