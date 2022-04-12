import Block from '../../utils/Block';
import './ServerErrorPage.scss';

export class ServerErrorPage extends Block {
  protected render(): string {
    return `
      <div class="server-error-page">
        <div class="server-error-page-content">
          <h1 class="server-error-page-title">
            500
          </h1>
          <p class="server-error-page-subtitle">
            Мы уже фиксим
          </p>
          {{{CustomLink
            text="Назад к чатам"
            href="/"
          }}}
        </div>
      </div>
    `;
  }
}
