import FormLayout from '../../layout/FormLayout';
import myCompile from '../../utils/myCompile';
import { fields, controls } from './utils';
import template from './SignUp.tmpl';
import './SignUp.scss';

const SignUp = () =>
  myCompile({
    template,
    props: {
      content: FormLayout({
        title: 'Регистрация',
        fields,
        controls,
      }),
    },
  });

export default SignUp;
