import Block from '../../utils/Block';
import UserAvatar from './components/UserAvatar';
import UserOptions from './components/UserOptions';
import { registerComponent } from '../../utils';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';
import { getUserInfoRows } from './utils/getUserInfoRows';
import { getUser, logout } from '../../services/auth';
import { UserProfileProps } from './types';
import './UserProfile.scss';

registerComponent(UserAvatar);
registerComponent(UserOptions);
export class UserProfile extends Block<UserProfileProps> {
  static componentName = 'UserProfile';

  constructor(props: UserProfileProps) {
    super(props);

    if (!this.props.store.getState().user) {
      this.props.store.dispatch(getUser);
    }

    this.setProps({
      onLogout: () => this.props.store.dispatch(logout),
    });
  }

  componentDidMount(): void {
    this.setState({
      userInfoRows: getUserInfoRows(
        this.state.userInfoRows,
        this.props.store.getState().user
      ),
    });
  }

  protected getStateFromProps() {
    this.state = {
      userInfoRows: [
        { name: 'email', label: 'Почта', value: '-' },
        { name: 'login', label: 'Логин', value: '-' },
        { name: 'firstName', label: 'Имя', value: '-' },
        { name: 'secondName', label: 'Фамилия', value: '-' },
        { name: 'displayName', label: 'Имя в чате', value: '-' },
        { name: 'phone', label: 'Телефон', value: '-' },
      ],
    };
  }

  protected render(): string {
    const avatar = this.props.store.getState().user?.avatar;
    const userName = this.props.store.getState().user?.firstName;

    return `
      <div class="user-profile">
        <div class="user-profile-container">
          {{{CustomLink
            text="Назад к чатам"
            href="/chats"
            className="user-profile-icon-back"
          }}}
          ${
            avatar
              ? `
                {{{UserAvatar
                  avatar="https://ya-praktikum.tech/api/v2/resources/${avatar}"
                  alt="Аватарка"
                  userName="${userName}"
                }}}
              `
              : `
                {{{UserAvatar
                  alt="Аватарка"
                }}}
              `
          }
          <ul class="user-info-list">
            {{#each userInfoRows}}
              <li class="user-info-item">
                <span class="user-info-label">{{label}}</span>
                <span class="user-info-value">{{value}}</span>
              </li>
            {{/each}}
          </ul>
          {{{UserOptions}}}
        </div>
      </div>
    `;
  }
}

export default withRouter(withStore(UserProfile));
