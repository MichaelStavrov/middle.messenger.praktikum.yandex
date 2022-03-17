import ComingSoonPage from '../../layout/ComingSoonPage/ComingSoonPage';
import CustomLink from '../../components/CustomLink';
import { routes } from '../../const';

const Chats = () =>
  ComingSoonPage({
    title: 'Чаты',
    subtitle: 'Наполняем чаты сообщениями...',
    link: CustomLink({
      href: routes.userProfile,
      linkName: 'Профиль',
    }),
  });

export default Chats;
