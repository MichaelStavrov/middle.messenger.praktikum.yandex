import App from './components/App';
import renderMain from './utils/renderMain';
import { renderDOM } from './utils';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(App);
  renderMain();
});
