import FormLayout from '../../layout/FormLayout';
import myCompile from '../../utils/myCompile';
import { fields, controls } from './utils';
import template from './SignIn.tmpl';
import './SignIn.scss';

const SignIn = () =>
  myCompile({
    template,
    props: {
      content: FormLayout({
        title: 'Вход',
        fields,
        controls,
      }),
    },
  });

export default SignIn;
