import { changeAvatar } from '../../../../services/user';
import { EventsProps } from '../../../../types';
import Block from '../../../../utils/Block';
import { withRouter } from '../../../../utils/withRouter';
import { withStore } from '../../../../utils/withStore';
import { UserAvatarProps } from './types';
import './UserAvatar.scss';

export class UserAvatar extends Block<UserAvatarProps & Partial<EventsProps>> {
  public static componentName = 'UserAvatar';

  constructor(props: UserAvatarProps) {
    super(props);

    this.setProps({
      events: {
        ...this.props.events,
        change: this.state.onChangeAvatar,
      },
    });
  }

  protected getStateFromProps() {
    this.state = {
      file: null,
      onChangeAvatar: (e: Event) => {
        const filelist = (e.target as HTMLInputElement)?.files;
        if (filelist?.length) {
          this.state.file = filelist[0];
        }

        this.props.store.dispatch(changeAvatar, { file: this.state.file });
      },
    };
  }

  protected render(): string {
    return `
      <div class="user-avatar-container">
        <div class="user-avatar-wrapper">
          <img
            class="user-avatar"
            {{#if avatar}}
              src="{{avatar}}"
            {{/if}}
          />
          {{{InputFile onChange=onChangeAvatar}}}
        </div>
        <span class="user-avatar-name">{{userName}}</span>
      </div>
    `;
  }
}

export default withRouter(withStore(UserAvatar));
