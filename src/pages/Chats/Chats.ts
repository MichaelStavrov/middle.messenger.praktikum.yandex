import Chat from './components/Chat';
import Block from '../../utils/Block';
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

      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      // onBlur: (e: FocusEvent) => {
      //   const inputName = (e.target as HTMLInputElement).name;
      //   const inputValue = (e.target as HTMLInputElement).value;

      //   this.validateForm({
      //     errorsState: this.state.errors,
      //     inputName,
      //     inputValue,
      //   });

      //   this.state.values[inputName] = inputValue;
      //   const nextState = {
      //     errors: { ...this.state.errors },
      //     values: { ...this.state.values },
      //   };

      //   this.setState(nextState);
      // },

      // onChange(e: Event) {
      //   const targetValue = (e.target as HTMLInputElement).value;
      //   console.log(targetValue);
      // },
      sendMessage: (e: SubmitEvent) => {
        e.preventDefault();
        const formElements = e.composedPath() as HTMLElement[];
        const form = formElements.find((elem) => elem.tagName === 'FORM');
        const inputs = Array.from(
          form?.querySelectorAll('input') ?? []
        ) as HTMLElement[];

        inputs.forEach((input) => {
          const inputName = input.getAttribute('name') ?? '';
          const inputValue = input.getAttribute('value') ?? '';
          this.state.values[inputName] = inputValue;
          this.validateForm({
            errorsState: this.state.errors,
            inputName,
            inputValue,
          });
        });

        const nextState = {
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        };

        this.setState(nextState);

        if (!Object.values(this.state.errors).some(Boolean)) {
          console.log(this.state.values);
        }

        // console.log((e.target as HTMLElement).parentElement);

        // const array = Array.from(e.composedPath()) as HTMLElement[];

        // const form = array.find((elem) => elem.nodeName === 'FORM');
        // const inputs = Array.from(
        //   form?.querySelectorAll('input') ?? []
        // ) as HTMLElement[];
        // inputs.forEach((input) => {
        //   const name = input.getAttribute('name');
        //   const value = input.getAttribute('value');

        // this.validateForm({
        //   errorsState: this.state.errors,
        //   inputName: name ?? '',
        //   inputValue: value ?? '',
        // });
        // });
        // const nextState = {
        //   errors: { ...this.state.errors },
        //   values: { ...this.state.values },
        // };
        // if (!Object.values(nextState.errors).some(Boolean)) {
        //   console.log(nextState.values);
        // }

        // this.setState(nextState);
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
          <div class="corresp-main"></div>
          <div class="corresp-footer">
            <div class="corresp-footer-options">
              <img src="${clip}"/>
            </div>
            <form class="corresp-textarea">
              <div class="corresp-textfield">
                {{{TextField
                  error="${errors.message}"
                  value="${values.message}"
                  type="text"
                  placeholder="Сообщение"
                  name="message"
                  onFocus=onFocus
                  className="search"
                }}}
              </div>
              <div class="corresp-submit-button-container">
                {{{Button
                  className="submit-message "
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
