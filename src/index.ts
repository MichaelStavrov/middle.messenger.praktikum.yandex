import * as components from './components';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Chats from './pages/Chats';
import UserProfile from './pages/UserProfile';
import UpdateUserInfo from './pages/UpdateUserInfo';
import UpdateUserPassword from './pages/UpdateUserPassword';
import ServerErrorPage from './pages/ServerErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import { registerComponent, renderDOM } from './utils';
import { BrowserRouter } from './utils/BrowserRouter';
import { Store } from './utils/Store';
import { getScreenComponent } from './utils/screenList';
import { defaultState } from './store';
import './index.scss';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    router: BrowserRouter;
    store: Store<AppState>;
  }
}

const router = new BrowserRouter();
const store = new Store<AppState>(defaultState);

window.router = router;
window.store = store;

store.on('changed', (prevState, nextState) => {
  if (prevState.screen !== nextState.screen) {
    const Page = getScreenComponent(nextState.screen);

    renderDOM(new Page());
  }
});

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
