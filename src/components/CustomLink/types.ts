import { BrowserRouter } from '../../utils/BrowserRouter';

export type CustomLinkProps = {
  text?: string;
  href: string;
  className?: string;
  onClick?: () => void;
  router: BrowserRouter;
};
