import { BrowserRouter } from '../../../../utils/BrowserRouter';
import { Store } from '../../../../utils/Store';

export interface UserAvatarProps {
  image: string;
  alt: string;
  userName: string;
  router: BrowserRouter;
  store: Store<AppState>;
}
