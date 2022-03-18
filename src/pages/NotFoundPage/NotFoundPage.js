import ComingSoonPage from '../../layout/ComingSoonPage/ComingSoonPage';
import CustomLink from '../../components/CustomLink';
import { ROUTES } from '../../const';

const NotFoundPage = () =>
  ComingSoonPage({
    title: '404',
    subtitle: 'Не туда попали',
    link: CustomLink({
      href: ROUTES.chats,
      linkName: 'Назад к чатам',
    }),
  });

export default NotFoundPage;
