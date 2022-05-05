import Block from '../../../../utils/Block';
import { ChatProps } from './types';
import './Chat.scss';
import { EventsProps } from '../../../../types';

export class Chat extends Block<ChatProps & EventsProps> {
  public static componentName = 'Chat';

  constructor({ onClick, id, ...rest }: ChatProps) {
    super({ events: { click: onClick }, id, ...rest });
  }

  protected render(): string {
    return `
      <div class="chat" data-chat-id="{{id}}">
        <div class="chat-avatar">
        </div>
        <div class="chat-content">
          <div class="chat-content-top">
            <span class="chat-content-title">{{title}}</span>
            <span class="chat-content-time">{{time}}</span>
          </div>
          <span class="chat-content-subtitle">{{subtitle}}</span>
        </div>
      </div>
    `;
  }
}
