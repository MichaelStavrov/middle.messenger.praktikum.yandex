import Chats from '../pages/Chats';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';
import UpdateUserInfo from '../pages/UpdateUserInfo';
import UpdateUserPassword from '../pages/UpdateUserPassword';
import { ROUTES } from '../const';

const routing = (endpoint) => {
  const {
    chats,
    signIn,
    signUp,
    userProfile,
    serverErrorPage,
    updateUserInfo,
    updateUserPassword,
  } = ROUTES;

  switch (endpoint) {
    case chats:
      return Chats();
    case signIn:
      return SignIn();
    case signUp:
      return SignUp();
    case userProfile:
      return UserProfile();
    case updateUserInfo:
      return UpdateUserInfo();
    case updateUserPassword:
      return UpdateUserPassword();
    case serverErrorPage:
      return ServerErrorPage();

    default:
      return NotFoundPage();
  }
};

export default routing;
