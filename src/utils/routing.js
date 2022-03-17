import Chats from '../pages/Chats';
import NotFoundPage from '../pages/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp';
import UserProfile from '../pages/UserProfile';
import { routes } from '../const';

const routing = (endpoint) => {
  const { chats, signIn, signUp, userProfile, serverErrorPage } = routes;

  switch (endpoint) {
    case chats:
      return Chats();
    case signIn:
      return SignIn();
    case signUp:
      return SignUp();
    case userProfile:
      return UserProfile();
    case serverErrorPage:
      return ServerErrorPage();

    default:
      return NotFoundPage();
  }
};

export default routing;
