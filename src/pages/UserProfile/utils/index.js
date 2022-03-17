import CustomLink from '../../../components/CustomLink';
import { routes } from '../../../const';

export const userInfoRows = [
  { label: 'Почта', value: 'danchik@yandex.ru' },
  { label: 'Логин', value: 'YaDan' },
  { label: 'Имя', value: 'Dan' },
  { label: 'Фамилия', value: 'Baramov' },
  { label: 'Имя в чате', value: 'DB' },
  { label: 'Телефон', value: '+0 (000) 000 00 00' },
];

const { updateUserInfo, updateUserPassword, signIn } = routes;

export const userOptions = [
  CustomLink({ href: updateUserInfo, linkName: 'Изменить данные' }),
  CustomLink({ href: updateUserPassword, linkName: 'Изменить пароль' }),
  CustomLink({
    href: signIn,
    linkName: 'Выйти',
    addClassName: 'danger',
  }),
];
