import Button from '../components/Button';
import CustomLink from '../components/CustomLink';
import TextField from '../components/TextField';
import registerComponent from './registerComponent';
import routing from './routing';

registerComponent(Button);
registerComponent(TextField);
registerComponent(CustomLink);

export default function renderMain() {
  const CurrentPage = routing(window.location.pathname);
  const block = new CurrentPage();

  const root = document.querySelector('#main-content');
  if (root) {
    root.innerHTML = '';
    root.appendChild(block.getContent());
  }
}
