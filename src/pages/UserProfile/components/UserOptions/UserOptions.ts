import Block from '../../../../utils/Block';

import './UserOptions.scss';

export class UserOptions extends Block {
  public static componentName = 'UserOptions';

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
          {{{CustomLink
            text="Выйти"
            href="/sign-in"
            className="danger"
          }}}
        </li>
      </ul>
    `;
  }
}
