import Block from '../../utils/Block';
import './UpdateUserPassword.scss';

export class UpdateUserPassword extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
      // onSave: () => {},
    };
  }

  render() {
    const { values } = this.state;
    return `
      <div class="update-user-password-content">
        <form class="update-user-password-form">
          <h1 class="update-user-password-title">
            Изменение пароля
          </h1>
          <fieldset class="update-user-password-fieldset">
            {{{TextField
              value="${values.password}"
              placeholder="Старый пароль"
              id="update-password"
              type="text"
            }}}
            {{{TextField
              value="${values.newPassword}"
              placeholder="Новый пароль"
              id="update-new-password" 
              type="text"
            }}}
            {{{TextField
              value="${values.confirmPassword}"
              placeholder="Повторите новый пароль"
              id="update-confirm-Password" 
              type="text"
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
