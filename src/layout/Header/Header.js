import Navigation from './components/Navigation/Navigation';
import myCompile from '../../utils/myCompile';
import template from './Header.tmpl';

const Header = (props) =>
  myCompile({
    template,
    props: { ...props, navigation: Navigation() },
  });

export default Header;
