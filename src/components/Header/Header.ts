import Block from '../../utils/Block';
import './Header.scss';

export class Header extends Block {
  protected render(): string {
    return `
    <nav>
      <ul class="navigation-list">
        <li>
          {{{CustomLink
            text="Регистрация"
            href="/sign-up"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="Вход"
            href="/sign-in"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="Чаты"
            href="/"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="Профиль"
            href="/user-profile"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="Изменение данных"
            href="/update-user-info"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="Изменение пароля"
            href="/update-user-password"
          }}}
        </li>
        <li>
          {{{CustomLink
            text="404"
            href="/*"
          }}}
        </li>  
        <li>
          {{{CustomLink
            text="500"
            href="/server-error"
          }}}
        </li>
      </ul>
    </nav>
    `;
  }
}
