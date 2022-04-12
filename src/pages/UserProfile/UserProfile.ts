import Block from '../../utils/Block';
import UserAvatar from './components/UserAvatar';
import UserOptions from './components/UserOptions';
import { registerComponent } from '../../utils';
import avatar from '../../assets/dan_abramov.jpeg';
import arrowBack from '../../assets/arrow-back.svg';
import './UserProfile.scss';

registerComponent(UserAvatar);
registerComponent(UserOptions);

export class UserProfile extends Block {
  protected getStateFromProps() {
    this.state = {
      userInfoRows: [
        { label: 'Почта', value: 'danchik@yandex.ru' },
        { label: 'Логин', value: 'YaDan' },
        { label: 'Имя', value: 'Dan' },
        { label: 'Фамилия', value: 'Baramov' },
        { label: 'Имя в чате', value: 'DB' },
        { label: 'Телефон', value: '+0 (000) 000 00 00' },
      ],
    };
  }

  protected render(): string {
    return `
      <div class="user-profile">
        <div class="user-profile-container">
          <a class="user-profile-link-to-back" href="/">
            <img class="user-profile-icon-back" src=${arrowBack} alt="вернуться назад"/>
          </a>
          {{{UserAvatar
            image="${avatar}"
            alt="Аватарка"
            userName="Dan"
          }}}
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
