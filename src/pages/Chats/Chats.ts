import Chat from './components/Chat';
import Block from '../../utils/Block';
import validateForm from '../../utils/validateForm';
import { registerComponent } from '../../utils';
import arrowRight from '../../assets/arrow-right.svg';
import arrowBack from '../../assets/arrow-back.svg';
import dots from '../../assets/vertical-dots.svg';
import clip from '../../assets/clip.svg';
import { withStore } from '../../utils/withStore';
import { withRouter } from '../../utils/withRouter';
import { BrowserRouter } from '../../utils/BrowserRouter';
import { Store } from '../../utils/Store';
import './Chats.scss';
import { getUser } from '../../services/auth';
import {
  addUserToChat,
  createChat,
  createSocket,
  getChats,
  getChatToken,
  getChatUsers,
  removeChat,
  removeUserFromChat,
  searchUser,
} from '../../services/chats';
import { transformUser } from '../../utils/apiTransformers';

registerComponent(Chat);

export interface ChatsProps {
  router: BrowserRouter;
  store: Store<AppState>;
}

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super(props);

    this.props.store.dispatch(getChats);
    this.props.store.dispatch(getUser);
  }

  protected getStateFromProps() {
    this.state = {
      showAddChatModal: false,
      showAddUserModal: false,
      showChatUsers: false,
      isVisibleMenu: false,
      selectedChat: {
        title: '',
        id: '',
      },
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
          this.props.store.getState().socket?.send(
            JSON.stringify({
              content: this.state.values.message,
              type: 'message',
            })
          );
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
      onSelectChat: (e: Event) => {
        const chatId = (e.currentTarget as HTMLElement).dataset.chatId;
        const { chats } = this.props.store.getState();

        if (chatId) {
          const selectedChat = chats.find(
            ({ id }: { id: number }) => id === +chatId
          );
          this.props.store.dispatch(getChatUsers, { chatId: +chatId });

          if (selectedChat) {
            const { title, id } = selectedChat;

            this.setState({
              selectedChat: {
                title,
                id,
              },
            });
            this.props.store.dispatch(getChatToken, { chatId: id });
          }
        }
      },
      onAddChat: () => {
        this.setState({
          showAddChatModal: true,
        });
      },
      onConfirmAddChat: () => {
        const input = this.refs.chatName.firstElementChild as HTMLInputElement;
        const { value } = input;

        if (value) {
          this.props.store.dispatch(createChat, {
            title: value,
          });

          this.setState({
            showAddChatModal: false,
          });
        }
      },
      onCancelAddChat: () => {
        this.setState({
          showAddChatModal: false,
        });
      },
      onRemoveChat: () => {
        const { id } = this.state.selectedChat;
        if (id) {
          this.props.store.dispatch(removeChat, {
            chatId: id,
          });

          setTimeout(() => {
            const { chats } = this.props.store.getState();
            this.props.store.dispatch(getChatUsers, { chatId: chats[0].id });
            this.setState({
              selectedChat: {
                title: chats[0].title,
                id: chats[0].id,
              },
              isVisibleMenu: false,
            });
          }, 200);
        }
      },
      onToggleMenu: () => {
        this.setState({
          isVisibleMenu: !this.state.isVisibleMenu,
        });
      },
      onAddChatWithUser: () => {
        this.setState({
          showAddUserModal: !this.state.showAddUserModal,
        });
      },
      onAddUserToChat: () => {
        const {
          showAddUserModal,
          selectedChat: { id },
        } = this.state;

        const input = this.refs.loginName.firstElementChild as HTMLInputElement;
        const { value } = input;

        if (showAddUserModal && value) {
          this.props.store.dispatch(addUserToChat, {
            login: value,
            chatId: id,
          });
          this.setState({
            isVisibleMenu: false,
          });
        }

        this.setState({
          showAddUserModal: !this.state.showAddUserModal,
        });
      },
      onCancelAddUser: () => {
        this.setState({
          showAddUserModal: false,
          isVisibleMenu: false,
        });
      },
      onShowChatUsers: () => {
        this.setState({
          showChatUsers: true,
        });
      },
      onCloseChatUser: () => {
        this.setState({
          showChatUsers: false,
        });
      },
      onRemoveUserFromChat: (e: Event) => {
        const span = (e.target as HTMLElement)
          .nextElementSibling as HTMLElement;

        this.props.store.dispatch(removeUserFromChat, {
          userId: span.dataset.userId,
          chatId: this.state.selectedChat.id,
        });
      },
    };
  }
  protected render(): string {
    const {
      errors,
      values,
      selectedChat: { title },
      showAddChatModal,
      showAddUserModal,
      showChatUsers,
      isVisibleMenu,
    } = this.state;

    const { chats, chatUsers, user, chatMessages } =
      this.props.store.getState();

    return `
      <div>
        <div 
          class="modal" 
          style="display: ${showAddChatModal ? 'flex' : 'none'}"
        >
          <span class="modal-title">Введите название чата</span>
          {{{TextField
            name="chatName"
            type="text"
            placeholder="Название чата"
            ref="chatName"
          }}}
          <div class="modal-controls">
            {{{Button
              text="Создать"
              onClick=onConfirmAddChat
            }}}
            {{{Button
              text="Отмена"
              onClick=onCancelAddChat
              className="warning"
            }}}
          </div>
        </div>
        <div 
          class="modal" 
          style="display: ${showAddUserModal ? 'flex' : 'none'}"
        >
          <span class="modal-title">Введите логин пользователя</span>
          {{{TextField
            name="loginName"
            type="text"
            placeholder="Добавить пользователя"
            ref="loginName"
          }}}
          <div class="modal-controls">
            {{{Button
              text="Добавить"
              onClick=onAddUserToChat
            }}}
            {{{Button
              text="Отмена"
              onClick=onCancelAddUser
              className="warning"
            }}}
          </div>
        </div>
        <div 
          class="modal chat-users" 
          style="display: ${showChatUsers ? 'flex' : 'none'}"
        >
          <div class="chat-users-close-button">
          {{{Button
            className="transparent"
            onClick=onCloseChatUser
          }}}
          <span>X</span>
          </div>
          <span class="modal-title">Участники чата</span>
          <ul class="chat-users-list">
            ${chatUsers
              .map((user) => transformUser(user))
              .map(
                ({ firstName, secondName, id }) => `
                <li class="chat-users-list-item">
                  <div class="chat-users-list-fullname">
                    <span>${secondName}</span>
                    <span>${firstName}</span>
                  </div>
                  <div class="chat-users-list-remove-button">
                    {{{Button
                      className="transparent"
                      onClick=onRemoveUserFromChat
                    }}}
                    ${
                      id !== user?.id
                        ? `<span data-user-id="${id}">X</span>`
                        : ''
                    }
                  </div>
                </li>
              `
              )
              .join('')}
          </ul>
        </div>
        <div class="chats-container" style="opacity: ${
          showAddChatModal || showAddUserModal || showChatUsers ? '.4' : '1'
        }">
          <div class="chats">
            <div class="chats-controls">
                {{{Button
                  text="Создать чат"
                  className="link-view-button"
                  onClick=onAddChat
                }}}
              <div>
                {{{CustomLink
                  text="Профиль"
                  href="/profile"
                  className="gray"
                }}}
                <img class="chats-arrow-icon" src="${arrowRight}"/>
              </div>
            </div>
            <div class="chats-search-field">
              {{{TextField
                className="search"
                placeholder="Поиск"
                name="chats-search-field"
              }}}
            </div>
            <div class="chats-list">
              ${chats
                .map(
                  ({ title, id }: { title: string; id: number }) =>
                    `
                  {{{Chat
                    avatar=""
                    title="${title}"
                    time="10:00"
                    subtitle="Здесь чат"
                    onClick=onSelectChat
                    id="${id}"
                  }}}
                `
                )
                .join('')}
            </div>
          </div>
          <div class="corresp">
            <div class="corresp-header">
              <div class="corresp-companion-info">
                <div class="corresp-companion-avatar"></div>
                <div class="corresp-companion-title-subtitle">
                ${
                  title
                    ? `<span class="corresp-companion-title">${title}</span>`
                    : `<span class="corresp-companion-title">Выберите чат для общения</span>`
                }
                  ${
                    chatUsers.length > 0
                      ? `
                        <div class="corresp-companion-subtitle-wrapper">
                          {{{Button
                            className="transparent"
                            onClick=onShowChatUsers
                          }}}
                          <span class="corresp-companion-subtitle">${chatUsers.length} участников</span>
                        </div>
                          `
                      : ''
                  }
                </div>
              </div>
              <div class="corresp-header-options">
                {{{Button
                  onClick=onToggleMenu
                  className="transparent"
                  styles=" width: 16px; height: 16px; position: absolute; left: -8px;"
                }}}
                <img src="${dots}"/>
                <div class="corresp-header-options-menu" style="display: ${
                  isVisibleMenu ? 'flex' : 'none'
                }">
                
                  {{{Button
                    className="link-view-button"
                    text="Добавить пользователя"
                    onClick=onAddUserToChat
                  }}}
                  {{{Button
                    className="link-view-button danger"
                    text="Удалить чат"
                    onClick=onRemoveChat
                  }}}
                </div>
              </div>
            </div>
            <div class="corresp-main">
              <ul class="message-list">
                  ${chatMessages
                    .map(
                      ({ message, userId }) =>
                        `
                          <li 
                            class="message-list-item" 
                            style="align-self: ${
                              user?.id !== userId ? 'flex-start' : 'flex-end'
                            }"
                          >
                            ${message}
                          </li>
                        `
                    )
                    .join('')}
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
      </div>
    `;
  }
}

export default withRouter(withStore(Chats));
