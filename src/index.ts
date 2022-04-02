// import App from './components/App/App';
import SignInPage from './pages/SignIn';

import { renderDOM } from './utils/renderDOM';

// const root = document.getElementById('root');
// root.innerHTML = App();

document.addEventListener('DOMContentLoaded', () => {
  const signIn = new SignInPage({
    buttonLabel: 'Click',
    events: {
      click: (e: MouseEvent) => {
        console.log('click');
      },
    },
  });

  renderDOM('#root', signIn);

  setTimeout(() => {
    signIn.setProps({
      buttonLabel: 'Click me',
      events: {
        click: (e: MouseEvent) => {
          console.log('another click');
        },
      },
    });
  }, 2000);
});
