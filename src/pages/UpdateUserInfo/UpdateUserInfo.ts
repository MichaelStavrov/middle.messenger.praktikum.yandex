import Block from '../../utils/Block';
import './UpdateUserInfo.scss';

export class UpdateUserInfo extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: 'Login',
        email: 'email@mail.ru',
        first_name: 'First-name',
        second_name: 'Second-name',
        display_name: 'Display-name',
        phone: '+123456789',
      },
      errors: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      onSave: (e: SubmitEvent) => {
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
    const { values, errors } = this.state;
    return `
      <div class="update-user-info-content">
        <form class="update-user-info-form">
          <h1 class="update-user-info-title">
            Изменение данных
          </h1>
          <fieldset class="update-user-info-fieldset">
            {{{TextField
              value="${values.login}"
              error="${errors.login}"
              name="login"
              label="Логин"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.email}"
              error="${errors.email}"
              name="email"
              label="Почта"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.first_name}"
              error="${errors.first_name}"
              name="first_name"
              label="Имя"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.second_name}"
              error="${errors.second_name}"
              name="second_name"
              label="Фамилия"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.display_name}"
              error="${errors.display_name}"
              name="display_name"
              label="Имя в чате"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.phone}"
              error="${errors.phone}"
              name="phone"
              label="Телефон"
              type="text"
              onFocus=onFocus
            }}}
          </fieldset>
          <div class="update-user-info-contolr">
            {{{Button
              text="Сохранить"
              onClick=onSave
            }}}
          </div>
        </form>
      </div>
    `;
  }
}
