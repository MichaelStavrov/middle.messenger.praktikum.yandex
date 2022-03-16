import Button from '../../../components/Button';
import CustomLink from '../../../components/CustomLink';

export const fields = [
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'login', placeholder: 'Логин' },
  { name: 'first_name', placeholder: 'Имя' },
  { name: 'second_name', placeholder: 'Фамилия' },
  { name: 'phone', placeholder: 'Телефон' },
  { name: 'password', placeholder: 'Пароль', type: 'password' },
  {
    name: 'password_confirm',
    placeholder: 'Пароль&nbsp;(еще&nbsp;раз)',
    type: 'password',
  },
];

export const controls = [
  Button({
    buttonText: 'Зарегистрироваться',
    type: 'button',
    id: 'sign-in-button',
  }),
  CustomLink({ href: '/sign-in', linkName: 'Войти' }),
];
