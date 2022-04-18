import Block from '../../utils/Block';
import './NotFoundPage.scss';

export class NotFoundPage extends Block {
  protected render(): string {
    return `
      <div class="not-found-page">
        <div class="not-found-page-content">
          <h1 class="not-found-page-title">
            404
          </h1>
          <p class="not-found-page-subtitle">
            Не туда попали
          </p>
          {{{CustomLink
            text="Назад к чатам"
            href="/chats"
          }}}
        </div>
      </div>
    `;
  }
}
