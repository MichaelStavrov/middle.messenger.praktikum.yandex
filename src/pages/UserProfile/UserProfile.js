import UserAvatar from './components/UserAvatar';
import UserInfo from './components/UserInfo';
import UserOptions from './components/UserOptions';
import myCompile from '../../utils/myCompile';
import { userInfoRows, userOptions } from './utils';
import { routes } from '../../const';
import userImage from '../../assets/dan_abramov.jpeg';
import iconBack from '../../assets/arrow-back.svg';
import template from './UserProfile.tmpl';
import './UserProfile.scss';

const UserProfile = (props) =>
  myCompile({
    template,
    props: {
      ...props,
      href: routes.chats,
      icon: iconBack,
      avatar: UserAvatar({
        image: `${userImage}`,
        alt: 'avatar',
        userName: 'Dan',
      }),
      info: UserInfo({ userInfoRows }),
      options: UserOptions({ options: userOptions }),
    },
  });

export default UserProfile;
