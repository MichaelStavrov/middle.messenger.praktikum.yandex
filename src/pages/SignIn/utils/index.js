import Button from '../../../components/Button';
import CustomLink from '../../../components/CustomLink';

export const fields = [
  { name: 'login', placeholder: 'Логин', id: 'id' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
];

export const controls = [
  Button({ buttonText: 'Войти', type: 'button', id: 'sign-in-control' }),
  CustomLink({ href: '/sign-up', linkName: 'Зарегистрироваться' }),
];
