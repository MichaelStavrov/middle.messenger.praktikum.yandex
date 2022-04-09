import Block from '../../utils/Block';
import './UpdateUserInfo.scss';

export class UpdateUserInfo extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: 'login',
        email: 'email',
        name: 'name',
        secondName: 'secondName',
        pseudonym: 'pseudonym',
        phone: 'phone',
      },
      onSave: () => {},
    };
  }

  render() {
    const { values } = this.state;
    return `
      <div class="update-user-info-content">
        <form class="update-user-info-form">
          <h1 class="update-user-info-title">
            Изменение данных
          </h1>
          <fieldset class="update-user-info-fieldset">
            {{{TextField
              value="${values.login}"
              label="Логин"
              id="update-login"
              type="text"
            }}}
            {{{TextField
              value="${values.email}"
              label="Почта"
              id="update-email" 
              type="text"
            }}}
            {{{TextField
              value="${values.name}"
              label="Имя"
              id="update-name" 
              type="text"
            }}}
            {{{TextField
              value="${values.secondName}"
              label="Фамилия"
              id="update-second-name" 
              type="text"
            }}}
            {{{TextField
              value="${values.pseudonym}"
              label="Имя в чате"
              id="update-pseudonym" 
              type="text"
            }}}
            {{{TextField
              value="${values.phone}"
              label="Телефон"
              id="update-phone" 
              type="text"
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
