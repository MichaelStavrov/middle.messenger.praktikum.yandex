import Block from '../../utils/Block';
import { ButtonProps } from './types';
import { EventsProps } from '../../types';
import './Button.scss';

export class Button extends Block<ButtonProps & EventsProps> {
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
      <button 
        class="button {{className}}"
        type="{{type}}"
        style="{{styles}}"
      >
        {{text}}
      </button>
    `;
  }
}
