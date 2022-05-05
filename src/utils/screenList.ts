import Block from './Block';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';

export enum Screens {
  SignIn = 'sign-in',
  SignUp = 'sign-up',
  UserProfile = 'user-profile',
}

const map = {
  [Screens.SignIn]: SignIn,
  [Screens.SignUp]: SignUp,
  [Screens.UserProfile]: UserProfile,
};

export const getScreenComponent = (screen: Screens): typeof Block => {
  return map[screen] as typeof Block;
};
