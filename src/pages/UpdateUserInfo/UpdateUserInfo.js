import FormLayout from '../../layout/FormLayout';
import Button from '../../components/Button';
import myCompile from '../../utils/myCompile';
import { userInfoRows } from '../UserProfile/utils';
import template from './UpdateUserInfo.tmpl';
import './UpdateUserInfo.scss';

const UpdateUserInfo = () =>
  myCompile({
    template,
    props: {
      content: FormLayout({
        title: 'Изменение данных',
        fields: userInfoRows,
        controls: [Button({ buttonText: 'Сохранить' })],
      }),
    },
  });

export default UpdateUserInfo;
