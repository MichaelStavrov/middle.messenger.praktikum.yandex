import Block from '../../utils/Block';
import validateForm from '../../utils/validateForm';
import { TextFieldProps } from './types';
import { EventsProps } from '../../types';
import './TextField.scss';

export class TextField extends Block<TextFieldProps & EventsProps> {
  public static componentName = 'TextField';

  constructor({
    onFocus,
    type = 'text',
    value,
    error,
    textarea,
    ...rest
  }: TextFieldProps) {
    super({
      type,
      error,
      value,
      textarea,
      events: { focus: onFocus },
      ...rest,
    });
  }

  protected getStateFromProps() {
    this.state = {
      name: '',
      error: {},
      values: {
        value: '',
      },

      onBlur: (e: FocusEvent) => {
        const inputName = (e.target as HTMLInputElement).name;
        const inputValue = (e.target as HTMLInputElement).value;

        this.props.value = inputValue;
        this.state.values.value = inputValue;

        this.state.name = inputName;
        validateForm({
          errorsState: this.state.error,
          inputName,
          inputValue,
        });
        this.props.error = this.state.error[inputName];
        const nextState = {
          error: { ...this.state.error },
          value: { ...this.state.values },
        };
        this.setState(nextState);
      },
    };
  }

  protected render(): string {
    Object.assign(this.props.events, {
      blur: this.state.onBlur,
    });

    return `
      <div class="text-field">
        {{#if label}}
          <label
           class="text-field-label" 
           {{#if id}} for={{id}} {{/if}}
          >
            {{label}}
          </label>
        {{/if}}
        {{#if textarea}}
          <textarea 
            class="text-field-input textarea {{className}}"
            {{#if id}} id={{id}} {{/if}}
            placeholder="{{placeholder}}"
            name={{name}}
            value={{#if value}}"{{value}}"{{else}}${
              this.state.values.value
            }{{/if}}
          >{{#if value}}{{value}}{{else}}${
            this.state.values.value
          }{{/if}}</textarea>
        {{else}}
          <input 
          class="text-field-input {{className}}"s
          {{#if id}} id={{id}} {{/if}} 
          type="{{type}}"
          placeholder="{{placeholder}}"
          name="{{name}}"
          autocomplete="off"
          value={{#if value}}
            "{{value}}"
            {{else}}
            "${this.state.values.value}"
        {{/if}}
        />
        {{/if}}
        <div class="text-field-error" id="text-field-error">
        {{#if error}} 
          {{error}} 
        {{else}}
          ${this.state.error[this.state.name] ?? ''} 
        {{/if}} 
        </div>
      </div>
    `;
  }
}
