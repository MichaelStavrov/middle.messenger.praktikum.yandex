import { Block } from '../../utils';
import './ErrorComponent.scss';

interface ErrorProps {
  value?: string;
}

export class ErrorComponent extends Block {
  static componentName = 'ErrorComponent';

  constructor(props: ErrorProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="error">{{#if value}}{{value}}{{/if}}</div>
    `;
  }
}
