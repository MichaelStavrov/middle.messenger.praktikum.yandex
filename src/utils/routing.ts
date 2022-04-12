import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';
import UpdateUserInfo from '../pages/UpdateUserInfo';
import UpdateUserPassword from '../pages/UpdateUserPassword';
import Chats from '../pages/Chats';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';
import { ROUTES } from '../const';

const routing = (endpoint: string) => {
  const {
    signIn,
    signUp,
    serverErrorPage,
    userProfile,
    updateUserInfo,
    updateUserPassword,
    chats,
  } = ROUTES;

  switch (endpoint) {
    case signIn:
      return SignIn;
    case signUp:
      return SignUp;
    case serverErrorPage:
      return ServerErrorPage;
    case userProfile:
      return UserProfile;
    case updateUserInfo:
      return UpdateUserInfo;
    case updateUserPassword:
      return UpdateUserPassword;
    case chats:
      return Chats;
    default:
      return NotFoundPage;
  }
};

export default routing;
