import Chat from './components/Chat';
import Block from '../../utils/Block';
import validateForm from '../../utils/validateForm';
import { registerComponent } from '../../utils';
import arrowRight from '../../assets/arrow-right.svg';
import arrowBack from '../../assets/arrow-back.svg';
import dots from '../../assets/vertical-dots.svg';
import clip from '../../assets/clip.svg';
import './Chats.scss';

registerComponent(Chat);

export class Chats extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        message: '',
      },
      errors: {
        message: '',
      },
      messages: ['message'],
      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      sendMessage: (e: SubmitEvent) => {
        e.preventDefault();
        const texFields = Object.values(this.refs) as HTMLElement[];
        texFields.forEach((field) => {
          const input = field.firstElementChild as HTMLInputElement;
          const { name, value } = input;
          this.state.values[name] = value;
          validateForm({
            errorsState: this.state.errors,
            inputName: name,
            inputValue: value,
          });
        });

        if (this.state.values.message) {
          this.state.messages.push(this.state.values.message);
        }

        const nextState = {
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        };
        this.setState(nextState);

        this.state.values.message = '';
        this.setState({
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        });
      },
    };
  }
  protected render(): string {
    const { errors, values } = this.state;

    return `
      <div class="chats-container">
        <div class="chats">
          <div class="chats-link-to-profile">
            {{{CustomLink
              text="Профиль"
              href="/user-profile"
              className="gray"
            }}}
            <img class="chats-arrow-icon" src="${arrowRight}"/>
          </div>
          <div class="chats-search-field">
            {{{TextField
              className="search"
              placeholder="Поиск"
              name="chats-search-field"
            }}}
          </div>
          {{{Chat
            avatar=""
            title="Чат 1"
            time="10:00"
            subtitle="Здесь чат 1"
          }}}
          {{{Chat
            avatar=""
            title="Чат 2"
            time="12:00"
            subtitle="Здесь чат 2"
          }}}
        </div>
        <div class="corresp">
          <div class="corresp-header">
            <div class="corresp-companion-info">
              <div class="corresp-companion-avatar"></div>
              <span class="corresp-companion-title">Кто-то</span>
            </div>
            <div class="corresp-header-options">
              <img src="${dots}"/>
            </div>
          </div>
          <div class="corresp-main">
            <ul class="message-list">
              {{#each messages}}
                <li class="message-list-item">{{this}}</li>
              {{/each}}
            </ul>
          </div>
          <div class="corresp-footer">
            <div class="corresp-footer-options">
              <img src="${clip}"/>
            </div>
            <form class="corresp-textarea">
              <div class="corresp-textfield">
              {{{TextField
                textarea="true"
                error="${errors.message}"
                value="${values.message}"
                type="text"
                placeholder="Сообщение"
                name="message"
                ref="message"
                onFocus=onFocus
                className="search"
              }}}
              </div>
              <div class="corresp-submit-button-container">
                {{{Button
                  className="submit-message"
                  onClick=sendMessage
                }}}
                <img
                    class="corresp-footer-send-icon"
                    src=${arrowBack} 
                    alt="отправить сообщение"
                />
              </div>
              </form>
          </div>
        </div>
      </div>
    `;
  }
}
