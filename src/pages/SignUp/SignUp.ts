import Block from '../../utils/Block';
import './SignUp.scss';
export class SignUpPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
        password_confirm: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
      },
      errors: {
        login: '',
        password: '',
        password_confirm: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
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
      <div class="sign-up-content">
        <form class="sign-up-form" id="sign-up-form">
          <h1 class="sign-up-form-title">
            Регистрация
          </h1>
          <fieldset class="sign-up-form-fieldset">
          {{{TextField
            error="${errors.email}"
            value="${values.email}"
            type="text"
            placeholder="Email"
            ref="email"
            name="email"
            onFocus=onFocus
          }}} 
          {{{TextField
            value="${values.login}"
            error="${errors.login}"
            type="text"
            placeholder="Логин"
            ref="login"
            name="login"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.first_name}"
            error="${errors.first_name}"
            type="text"
            placeholder="Имя"
            name="first_name"
            ref="first_name"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.second_name}"
            error="${errors.second_name}"
            type="text"
            placeholder="Фамилия"
            name="second_name"
            ref="second_name"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.phone}"
            error="${errors.phone}"
            type="text"
            placeholder="Телефон"
            ref="phone"
            name="phone"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.password}"
            error="${errors.password}"
            type="password"
            placeholder="Пароль"
            name="password"
            ref="password"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.password_confirm}"
            error="${errors.password_confirm}"
            type="password"
            placeholder="Пароль (еще раз)"
            name="password_confirm"
            ref="password_confirm"
            onFocus=onFocus
          }}}
          </fieldset>
          <div class="sign-up-form-contolrs">
            {{{Button
              type="submit"
              text="Зарегистрироваться"
              onClick=onLogin
            }}}
            {{{CustomLink
              text="Войти"
              href="/sign-in"
            }}}
          </div>
        </form>
      </div>
    `;
  }
}
