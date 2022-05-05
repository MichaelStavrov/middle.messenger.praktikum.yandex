import { logout } from '../../../../services/auth';
import Block from '../../../../utils/Block';
import { withRouter } from '../../../../utils/withRouter';
import { withStore } from '../../../../utils/withStore';
import { UserOptionsProps } from './types';
import './UserOptions.scss';

export class UserOptions extends Block<UserOptionsProps> {
  public static componentName = 'UserOptions';

  constructor(props: UserOptionsProps) {
    super(props);
  }

  protected getStateFromProps() {
    this.state = {
      onLogout: () => {
        this.props.store.dispatch(logout);
      },
    };
  }

  protected render(): string {
    return `
      <ul class="user-options-list">
        <li class="user-options-item">
          {{{CustomLink
            text="Изменить данные"
            href="/update-user-info"
          }}}
        </li>
        <li class="user-options-item">
          {{{CustomLink
            text="Изменить пароль"
            href="/update-user-password"
          }}}
        </li>
        <li class="user-options-item">
        {{{Button
          type="submit"
          text="Выйти"
          onClick=onLogout
        }}}
        </li>
      </ul>
    `;
  }
}

export default withRouter(withStore(UserOptions));
