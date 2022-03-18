import ComingSoonPage from '../../layout/ComingSoonPage/ComingSoonPage';
import CustomLink from '../../components/CustomLink';
import { ROUTES } from '../../const';

const Chats = () =>
  ComingSoonPage({
    title: 'Чаты',
    subtitle: 'Наполняем чаты сообщениями...',
    link: CustomLink({
      href: ROUTES.userProfile,
      linkName: 'Профиль',
    }),
  });

export default Chats;
