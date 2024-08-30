export interface Message {
  text: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  name: string;
}
