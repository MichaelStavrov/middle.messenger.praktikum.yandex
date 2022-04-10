import Block from '../../utils/Block';
import './UpdateUserPassword.scss';

export class UpdateUserPassword extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        password: '',
        newPassword: '',
        password_confirm: '',
      },
      errors: {
        password: '',
        newPassword: '',
        password_confirm: '',
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
      <div class="update-user-password-content">
        <form class="update-user-password-form">
          <h1 class="update-user-password-title">
            Изменение пароля
          </h1>
          <fieldset class="update-user-password-fieldset">
          {{{TextField
            value="${values.password}"
            error="${errors.password}"
            type="password"
            placeholder="Пароль"
            name="password"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.password_confirm}"
            error="${errors.password_confirm}"
            type="password"
            placeholder="Пароль (еще раз)"
            name="password_confirm"
            onFocus=onFocus
          }}}
            
            {{{TextField
              value="${values.newPassword}"
              error="${errors.newPassword}"
              type="password"
              placeholder="Новый пароль" 
              name="newPassword"
              onFocus=onFocus
            }}}
            
            <div class="update-user-password-contolr">
            {{{Button
              text="Сохранить"
              onClick=onSave
            }}}
          </div>
          </div>
        </form>
      </div>
    `;
  }
}
