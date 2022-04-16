import * as components from './components';
import App from './components/App';
import { registerComponent, renderDOM } from './utils';
import { BrowserRouter } from './utils/BrowserRouter';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chats from './pages/Chats';
import UserProfile from './pages/UserProfile';
import UpdateUserInfo from './pages/UpdateUserInfo';
import UpdateUserPassword from './pages/UpdateUserPassword';
import ServerErrorPage from './pages/ServerErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import './index.scss';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    router: BrowserRouter;
  }
}

const router = new BrowserRouter();
window.router = router;

renderDOM(new App());

router
  .use('/', SignIn, {})
  .use('/sign-in', SignIn, {})
  .use('/sign-up', SignUp, {})
  .use('/chats', Chats, {})
  .use('/profile', UserProfile, {})
  .use('/update-user-info', UpdateUserInfo, {})
  .use('/update-user-password', UpdateUserPassword, {})
  .use('/server-error', ServerErrorPage, {})
  .use('*', NotFoundPage, {})
  .start();
