// import FormLayout from '../../layout/FormLayout';
// import myCompile from '../../utils/myCompile';
// import { fields, controls } from './utils';
// import template from './SignIn.tmpl';
// import './SignIn.scss';

import Button from '../../components/Button';
import Block from '../../utils/Block';
import template from './SignIn.hbs';

// const SignIn = () =>
//   myCompile({
//     template,
//     props: {
//       content: FormLayout({
//         title: 'Вход',
//         fields,
//         controls,
//       }),
//     },
//   });

// export default SignIn;

export class SignInPage extends Block {
  constructor(props: { buttonLabel: string; events?: any }) {
    super(props);
  }

  protected initChildren(): void {
    this.children.button = new Button({
      label: this.props.buttonLabel,
      events: this.props.buttonEvents,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (oldProps.buttonLabel !== newProps.buttonLabel) {
      this.children.button.setProps({
        label: newProps.buttonLabel,
      });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(template, {});
  }
}
