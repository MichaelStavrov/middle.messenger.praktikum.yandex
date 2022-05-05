import { BrowserRouter } from '../../utils/BrowserRouter';
import { Store } from '../../utils/Store';

export interface UserProfileProps {
  router: BrowserRouter;
  store: Store<AppState>;
  formError?: () => string | null;
  userInfoRows: UserInfoRow[];
  onLogout?: () => void;
  user: User | null;
}

export interface UserInfoRow {
  name: string;
  label: string;
  value: string | number;
}
