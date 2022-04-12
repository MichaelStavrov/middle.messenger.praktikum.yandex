import Block from './Block';
import Button from '../components/Button';
import CustomLink from '../components/CustomLink';
import TextField from '../components/TextField';
import registerComponent from './registerComponent';
import routing from './routing';

registerComponent(Button);
registerComponent(TextField);
registerComponent(CustomLink);

export default function renderDOM(BlockPage: typeof Block) {
  const block = new BlockPage();
  const root = document.querySelector('#root');

  if (root) {
    root.innerHTML = '';
    root.appendChild(block.getContent());
  }

  const CurrentPage = routing(window.location.pathname);
  const page = new CurrentPage();

  const main = document.querySelector('#main-content');
  if (main) {
    main.innerHTML = '';
    main.appendChild(page.getContent());
  }
}
