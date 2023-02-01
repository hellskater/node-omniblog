export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  logo: string;
  toJSON: () => User;
}

export interface FilteredUser {
  _id: string;
  email: string;
  name: string;
  logo: string;
}
