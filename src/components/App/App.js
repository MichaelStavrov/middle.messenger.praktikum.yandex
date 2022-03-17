import Page from '../../layout/Page';
import Header from '../../layout/Header/Header';
import myCompile from '../../utils/myCompile';
import routing from '../../utils/routing';
import template from './App.tmpl';

const App = (props) =>
  myCompile({
    template,
    props: {
      ...props,
      header: Page({ content: Header() }),
      main: Page({
        content: routing(window.location.pathname),
      }),
    },
  });

export default App;
