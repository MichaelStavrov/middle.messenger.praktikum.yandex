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
        //   e.preventDefault();
        //   const array = Array.from(e.composedPath()) as HTMLElement[];
        //   const form = array.find((elem) => elem.nodeName === 'FORM');
        //   const inputs = Array.from(
        //     form?.querySelectorAll('input') ?? []
        //   ) as HTMLElement[];
        //   inputs.forEach((input) => {
        //     const name = input.getAttribute('name');
        //     const value = input.getAttribute('value');
        //     this.validateForm({
        //       errorsState: this.state.errors,
        //       inputName: name ?? '',
        //       inputValue: value ?? '',
        //     });
        //   });
        //   const nextState = {
        //     errors: { ...this.state.errors },
        //     values: { ...this.state.values },
        //   };
        //   console.log(nextState.errors);
        //   if (Object.values(nextState.values).every(Boolean)) {
        //     console.log(nextState.values);
        //   }
        //   this.setState(nextState);
      },

      // onLogin: () => {
      //   const loginInput = this.refs.login.querySelector(
      //     'input'
      //   ) as HTMLInputElement;
      //   const passwordInput = this.refs.password.querySelector(
      //     'input'
      //   ) as HTMLInputElement;

      //   const loginData = {
      //     login: loginInput.value,
      //     password: passwordInput.value,
      //   };

      //   const nextState = {
      //     errors: {
      //       login: '',
      //       password: '',
      //     },
      //     values: { ...loginData },
      //   };

      //   if (!loginData.login) {
      //     nextState.errors.login = 'Login is required';
      //   } else if (loginData.login.length < 4) {
      //     nextState.errors.login = 'Login should contain more than 3 chars';
      //   }

      //   if (!loginData.password) {
      //     nextState.errors.password = 'Password is required';
      //   }

      //   this.setState(nextState);
      // },
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
