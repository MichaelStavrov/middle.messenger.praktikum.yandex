import { authAPI, NewUser } from '../api/auth';
import { Dispatch } from '../utils/Store';
import { hasError } from '../utils/apiHasError';
import { transformUser } from '../utils/apiTransformers';
import { UserDTO } from '../api/types';

type LoginPayload = {
  login: string;
  password: string;
};

type ResponseType = Record<string, any>;

export const sendLoginData = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (hasError(response)) {
    dispatch({
      isLoading: false,
      loginFormError: JSON.parse(response.response).reason,
    });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (hasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(JSON.parse(responseUser.response)) });

  window.router.go('/chats');
};

export const sendRegisterData = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: NewUser
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.register(action);

  if (hasError(response)) {
    dispatch({
      isLoading: false,
      registerFormError: JSON.parse(response.response).reason,
    });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({
    isLoading: false,
    registerFormError: null,
    user: transformUser(JSON.parse(responseUser.response)),
  });

  window.router.go('/profile');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/sign-in');
};

export const getUser = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  // if (responseUser.status >= 400) {
  //   dispatch(logout);
  //   return;
  // }

  dispatch({ user: transformUser(JSON.parse(responseUser.response)) });
};

// export const service = {
//   async getUser(): Promise<any> {
//     const res: any = await request.get(`${baseUrl}/auth/user`);

//     return JSON.parse(res.response);
//   },

//   async sendLoginData(data: any) {
//     const res: any = await request.post(`${baseUrl}/auth/signin`, {
//       data: JSON.stringify({ login: 'ivan123', password: '123456' }),
//     });

//     return res.response;
//   },

//   async sendRegisterData(data: any) {
//     const res: any = await request.post(`${baseUrl}/auth/signup`, {
//       data: JSON.stringify({
//         first_name: 'string',
//         second_name: 'string',
//         login: 'string',
//         email: 'string',
//         password: 'string',
//         phone: 'string',
//       }),
//     });

//     return JSON.parse(res.response);
//   },

//   async getLogout() {
//     const res: any = await request.post(`${baseUrl}/auth/logout`);

//     return res.response;
//   },
// };

// import { authAPI } from '../api/auth';
// import { UserDTO } from 'api/types';
// import type { Dispatch } from 'core';
// import { transformUser, apiHasError } from 'utils';

// type LoginPayload = {
//   login: string;
//   password: string;
// };

// export const login = async (
//   dispatch: Dispatch<AppState>,
//   state: AppState,
//   action: LoginPayload
// ) => {
//   dispatch({ isLoading: true });

//   const response = await authAPI.login(action);

//   if (apiHasError(response)) {
//     dispatch({ isLoading: false, loginFormError: response.reason });
//     return;
//   }

//   const responseUser = await authAPI.me();

//   dispatch({ isLoading: false, loginFormError: null });

//   if (apiHasError(response)) {
//     dispatch(logout);
//     return;
//   }

//   dispatch({ user: transformUser(responseUser as UserDTO) });

//   window.router.go('/profile');
// };

// export const logout = async (dispatch: Dispatch<AppState>) => {
//   dispatch({ isLoading: true });

//   await authAPI.logout();

//   dispatch({ isLoading: false, user: null });

//   window.router.go('/onboarding');
// };
