import HTTPTransport from '../utils/HTTPTransport';

const request = new HTTPTransport();
const baseUrl = 'https://ya-praktikum.tech/api/v2';

export interface CreateSoketProps {
  userId: number;
  chatId: number;
  token: string;
}

export const chatsAPI = {
  addChat: (data: { title: string }) =>
    request.post(`${baseUrl}/chats`, { data }),

  getChats: (data?: { offset?: number; limit?: number; title?: string }) =>
    request.get(`${baseUrl}/chats`, { data }),

  deleteChat: (data: { chatId: number }) =>
    request.delete(`${baseUrl}/chats`, { data }),

  searchUser: (data: { login: string }) =>
    request.post(`${baseUrl}/user/search`, { data }),

  getUserById: (id: number) => request.get(`${baseUrl}/user/${id}`),

  getChatUsers: (chatId: number) =>
    request.get(`${baseUrl}/chats/${chatId}/users`),

  addUserToChat: (data: { users: number[]; chatId: number }) =>
    request.put(`${baseUrl}/chats/users`, { data }),

  deleteUserFromChat: (data: { users: number[]; chatId: number }) =>
    request.delete(`${baseUrl}/chats/users`, { data }),

  getChatToken: (chatId: number) =>
    request.post(`${baseUrl}/chats/token/${chatId}`),
};
