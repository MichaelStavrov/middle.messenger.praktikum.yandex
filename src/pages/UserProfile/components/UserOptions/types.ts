import { BrowserRouter } from '../../../../utils/BrowserRouter';
import { Store } from '../../../../utils/Store';

export interface UserOptionsProps {
  router: BrowserRouter;
  store: Store<AppState>;
}
