import Block from '../../../../utils/Block';
import { ChatProps } from './types';
import './Chat.scss';

export class Chat extends Block {
  constructor(props: ChatProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="chat">
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
