export type UserCard = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  image: string;
};

export type UserCards = UserCard[];

export type State = {
  userCards: UserCards;
  countries: string[];
};
