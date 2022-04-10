import { ButtonProps } from './types';
import Block from '../../utils/Block';
import './Button.scss';
export class Button extends Block {
  public static componentName = 'Button';

  constructor({ onClick, onSubmit, type = 'button', ...rest }: ButtonProps) {
    super({
      events: { click: onClick, submit: onSubmit },
      type,
      ...rest,
    });
  }

  protected render(): string {
    return `
      <button class="button {{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
