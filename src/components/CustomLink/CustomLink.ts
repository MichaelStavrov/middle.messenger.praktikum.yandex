import Block from '../../utils/Block';
import { CustomLinkProps } from './types';
import { EventsProps } from '../../types';
import './CustomLink.scss';

export class CustomLink extends Block<CustomLinkProps & EventsProps> {
  public static componentName = 'CustomLink';

  constructor({ onClick, ...rest }: CustomLinkProps) {
    super({ events: { click: onClick }, ...rest });
  }

  protected render(): string {
    return `
      <a class="custom-link {{className}}" href={{href}}>{{text}}</a>
    `;
  }
}
