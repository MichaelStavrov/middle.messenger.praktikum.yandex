import HTTPTransport from '../utils/HTTPTransport';

const request = new HTTPTransport();
const baseUrl = 'https://ya-praktikum.tech/api/v2';

type LoginRequestData = {
  login: string;
  password: string;
};

export type APIError = {
  reason: string;
};

export interface NewUser {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export const authAPI = {
  login: (data: LoginRequestData) =>
    request.post(`${baseUrl}/auth/signin`, { data }),

  register: (data: NewUser) => request.post(`${baseUrl}/auth/signup`, { data }),

  me: () => request.get(`${baseUrl}/auth/user`),

  logout: () => request.post(`${baseUrl}/auth/logout`),
};
