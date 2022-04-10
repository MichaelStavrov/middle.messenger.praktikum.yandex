import Block from '../../utils/Block';
import './SignIn.scss';

export class SignInPage extends Block {
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
          this.validateForm({
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
          console.log(this.state.values);
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
