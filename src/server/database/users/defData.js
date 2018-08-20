import { User } from '.';

export const data = [
  { login: 'user#1', password: 'user#1' },
];

export default function () {
  data.forEach(user => new User(user));
}
