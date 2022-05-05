import Block from '../../utils/Block';
import validateForm from '../../utils/validateForm';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';
import { SignInPageProps } from './types';
import './SignIn.scss';
import { getUser, sendLoginData } from '../../services/auth';

class SignInPage extends Block<SignInPageProps> {
  constructor(props: SignInPageProps) {
    super(props);

    this.setProps({
      formError: () => this.props.store.getState().loginFormError,
    });

    this.props.store.dispatch(getUser);
  }

  componentDidMount(): void {
    if (this.props.store.getState().user?.secondName) {
      this.props.router.go('/chats');
    }
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      onLogin: (e: SubmitEvent) => {
        e.preventDefault();

        const texFields = Object.values(this.refs) as HTMLElement[];
        texFields.forEach((field) => {
          const input = field.firstElementChild as HTMLInputElement;
          const { name, value } = input;
          this.state.values[name] = value;
          validateForm({
            errorsState: this.state.errors,
            inputName: name,
            inputValue: value,
          });
        });

        const nextState = {
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        };

        this.setState(nextState);

        if (!Object.values(this.state.errors).some(Boolean)) {
          this.props.store.dispatch(sendLoginData, this.state.values);
        }
      },
    };
  }

  render() {
    const { errors, values } = this.state;

    return `
      <div class="login-content">
        <form class="login-form">
          <h1 class="login-form-title">
            Вход
          </h1>
          <fieldset class="login-form-fieldset">
            {{{TextField
              value="${values.login}"
              error="${errors.login}"
              name="login"
              type="text"
              placeholder="Логин"
              ref="login"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.password}"
              error="${errors.password}"
              name="password"
              type="password"
              placeholder="Пароль"
              ref="password"
              onFocus=onFocus
            }}}
            {{{ErrorComponent value=formError}}}
          </fieldset>
          <div class="login-form-contolrs">
            {{{Button
              type="submit"
              text="Войти"
              onClick=onLogin
            }}}
            {{{CustomLink
              text="Зарегистрироваться"
              href="/sign-up"
            }}}
          </div>
        </form>
      </div>

    `;
  }
}

export default withRouter(withStore(SignInPage));
