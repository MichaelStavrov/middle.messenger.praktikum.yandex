import ComingSoonPage from '../../layout/ComingSoonPage/ComingSoonPage';
import CustomLink from '../../components/CustomLink';
import { routes } from '../../const';

const ServerErrorPage = () =>
  ComingSoonPage({
    title: '500',
    subtitle: 'Мы уже фиксим',
    link: CustomLink({
      href: routes.chats,
      linkName: 'Назад к чатам',
    }),
  });

export default ServerErrorPage;
