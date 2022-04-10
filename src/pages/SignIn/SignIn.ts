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
        const formElements = e.composedPath() as HTMLElement[];
        const form = formElements.find((elem) => elem.tagName === 'FORM');
        const inputs = Array.from(
          form?.querySelectorAll('input') ?? []
        ) as HTMLElement[];

        inputs.forEach((input) => {
          const inputName = input.getAttribute('name') ?? '';
          const inputValue = input.getAttribute('value') ?? '';
          this.state.values[inputName] = inputValue;
          this.validateForm({
            errorsState: this.state.errors,
            inputName,
            inputValue,
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
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.password}"
              error="${errors.password}"
              name="password"
              type="password"
              placeholder="Пароль"
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
