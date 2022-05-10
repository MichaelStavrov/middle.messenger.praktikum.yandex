import Block from '../../utils/Block';
import { withRouter } from '../../utils/withRouter';
import { CustomLinkProps } from './types';
import { EventsProps } from '../../types';
import './CustomLink.scss';

export class CustomLink extends Block<CustomLinkProps & EventsProps> {
  public static componentName = 'CustomLink';

  constructor({ onClick, href, router, ...rest }: CustomLinkProps) {
    super({ events: { click: onClick }, href, router, ...rest });
    this.setProps({
      href,
      events: {
        ...this.props.events,
        click: (e) => {
          e.preventDefault();
          router.go(href);
        },
      },
      router,
    });
  }

  protected render(): string {
    return `
      <a class="custom-link {{className}}" href={{href}}>{{text}}</a>
    `;
  }
}

export default withRouter(CustomLink);
