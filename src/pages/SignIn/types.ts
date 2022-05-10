import { BrowserRouter } from '../../utils/BrowserRouter';
import { Store } from '../../utils/Store';

export interface SignInPageProps {
  router: BrowserRouter;
  store: Store<AppState>;
  formError?: () => string | null;
}
