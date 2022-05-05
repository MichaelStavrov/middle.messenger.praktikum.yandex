import HTTPTransport from '../utils/HTTPTransport';

const request = new HTTPTransport();
const baseUrl = 'https://ya-praktikum.tech/api/v2';

export type APIError = {
  reason: string;
};

export interface NewPasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface NewUserInfo {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export const userAPI = {
  sendAvatar: (data: FormData) =>
    request.put(`${baseUrl}/user/profile/avatar`, {
      data,
      headers: {},
    }),

  sendNewPassword: (data: NewPasswordData) =>
    request.put(`${baseUrl}/user/password`, { data }),

  sendNewUserInfo: (data: NewUserInfo) =>
    request.put(`${baseUrl}/user/profile`, { data }),

  getUserInfo: (id: number) => request.get(`${baseUrl}/user/${id}`),
};
