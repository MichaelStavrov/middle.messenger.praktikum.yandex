import { CustomLinkProps } from './types';
import Block from '../../utils/Block';
import './CustomLink.scss';

export class CustomLink extends Block {
  constructor({ onClick, ...rest }: CustomLinkProps) {
    super({ events: { click: onClick }, ...rest });
  }

  protected render(): string {
    return `
      <a class="custom-link {{className}}" href={{href}}>{{text}}</a>
    `;
  }
}
