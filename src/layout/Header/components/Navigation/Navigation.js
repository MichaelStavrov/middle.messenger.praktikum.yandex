import CustomLink from '../../../../components/CustomLink';
import myCompile from '../../../../utils/myCompile';
import { routes } from '../../../../const';
import template from './Navigation.tmpl';
import './Navigation.scss';

const {
  serverErrorPage,
  chats,
  userProfile,
  notFound,
  signIn,
  signUp,
  updateUserInfo,
  updateUserPassword,
} = routes;

const links = [
  { href: signUp, linkName: 'Регистрация' },
  { href: signIn, linkName: 'Вход' },
  { href: chats, linkName: 'Чаты' },
  { href: userProfile, linkName: 'Профиль' },
  { href: updateUserInfo, linkName: 'Изменение данных' },
  { href: updateUserPassword, linkName: 'Изменение пароля' },
  { href: notFound, linkName: '404' },
  { href: serverErrorPage, linkName: '500' },
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
