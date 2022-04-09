import Block from '../../../../utils/Block';
import { UserAvatarProps } from './types';
import './UserAvatar.scss';

export class UserAvatar extends Block {
  constructor(props: UserAvatarProps) {
    super(props);
  }
  protected render(): string {
    return `
      <div class="user-avatar-container">
        <img class="user-avatar" src={{image}} alt={{alt}} />
        <span class="user-avatar-name">{{userName}}</span>
      </div>
    `;
  }
}
