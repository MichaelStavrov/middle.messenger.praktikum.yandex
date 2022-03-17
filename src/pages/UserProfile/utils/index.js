import Button from '../../../components/Button';
import CustomLink from '../../../components/CustomLink';

export const userInfoRows = [
  { label: 'Почта', value: 'danchik@yandex.ru' },
  { label: 'Логин', value: 'YaDan' },
  { label: 'Имя', value: 'Dan' },
  { label: 'Фамилия', value: 'Baramov' },
  { label: 'Имя в чате', value: 'DB' },
  { label: 'Телефон', value: '+0 (000) 000 00 00' },
];

export const userOptions = [
  CustomLink({ href: '/change-data', linkName: 'Изменить данные' }),
  CustomLink({ href: '/change-password', linkName: 'Изменить пароль' }),
  Button({ buttonText: 'Выйти', className: 'linkViewButton' }),
];
