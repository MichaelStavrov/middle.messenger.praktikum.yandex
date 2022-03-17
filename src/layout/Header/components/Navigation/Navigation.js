import CustomLink from '../../../../components/CustomLink';
import myCompile from '../../../../utils/myCompile';
import { routes } from '../../../../const';
import template from './Navigation.tmpl';
import './Navigation.scss';

const { serverErrorPage, chats, userProfile, notFound, signIn, signUp } =
  routes;

const links = [
  { href: serverErrorPage, linkName: 'Страница 500' },
  { href: chats, linkName: 'Страница с чатами' },
  { href: notFound, linkName: 'Страница 404' },
  { href: userProfile, linkName: 'Страница Профиля' },
  { href: signIn, linkName: 'Страница Входа' },
  { href: signUp, linkName: 'Страница Регистрации' },
];

const Navigation = (props) =>
  myCompile({
    template,
    props: {
      ...props,
      links: links.map((props) => CustomLink({ ...props, activeLink: true })),
    },
  });

export default Navigation;
