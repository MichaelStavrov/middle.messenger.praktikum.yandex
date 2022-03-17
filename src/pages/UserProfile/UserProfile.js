import UserAvatar from './components/UserAvatar';
import UserInfo from './components/UserInfo';
import UserOptions from './components/UserOptions';
import myCompile from '../../utils/myCompile';
import { userInfoRows, userOptions } from './utils';
import userImage from '../../assets/dan_abramov.jpeg';
import template from './UserProfile.tmpl';
import './UserProfile.scss';

const UserProfile = (props) =>
  myCompile({
    template,
    props: {
      ...props,
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
