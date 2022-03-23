import FormLayout from '../../layout/FormLayout';
import Button from '../../components/Button';
import myCompile from '../../utils/myCompile';
import template from './UpdateUserPassword.tmpl';
import './UpdateUserPassword.scss';

const fields = [
  { name: 'oldPassword', placeholder: 'Старый пароль' },
  { name: 'newPassword', placeholder: 'Новый пароль' },
  { name: 'confirmNewPassword', placeholder: 'Повторите новый пароль' },
];

const UpdateUserPassword = () =>
  myCompile({
    template,
    props: {
      content: FormLayout({
        title: 'Изменение пароля',
        fields,
        controls: [Button({ buttonText: 'Сохранить' })],
      }),
    },
  });

export default UpdateUserPassword;
