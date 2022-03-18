import ComingSoonPage from '../../layout/ComingSoonPage/ComingSoonPage';
import CustomLink from '../../components/CustomLink';
import { ROUTES } from '../../const';

const ServerErrorPage = () =>
  ComingSoonPage({
    title: '500',
    subtitle: 'Мы уже фиксим',
    link: CustomLink({
      href: ROUTES.chats,
      linkName: 'Назад к чатам',
    }),
  });

export default ServerErrorPage;
