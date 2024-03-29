import { getUser } from '../../services/auth';
import { changeUserInfo } from '../../services/user';
import Block from '../../utils/Block';
import { BrowserRouter } from '../../utils/BrowserRouter';
import { Store } from '../../utils/Store';
import validateForm from '../../utils/validateForm';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';
import './UpdateUserInfo.scss';

export interface UpdateUserInfoProps {
  router: BrowserRouter;
  store: Store<AppState>;
}

export class UpdateUserInfo extends Block<UpdateUserInfoProps> {
  constructor(props: UpdateUserInfoProps) {
    super(props);

    if (!this.props.store.getState().user) {
      this.props.store.dispatch(getUser);
    }
  }

  componentDidMount(): void {
    const { user } = this.props.store.getState();
    if (user) {
      const { login, email, displayName, firstName, secondName, phone } = user;
      this.setState({
        values: {
          login,
          email,
          first_name: firstName,
          second_name: secondName,
          display_name: displayName || '',
          phone,
        },
      });
    }
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      errors: {
        login: '',
        email: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: '',
      },
      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      onSave: (e: SubmitEvent) => {
        e.preventDefault();
        const texFields = Object.values(this.refs) as HTMLElement[];
        texFields.forEach((field) => {
          const input = field.querySelector('input') as HTMLInputElement;
          const { name, value } = input;
          this.state.values[name] = value;
          validateForm({
            errorsState: this.state.errors,
            inputName: name,
            inputValue: value,
          });
        });

        const nextState = {
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        };

        this.setState(nextState);

        if (!Object.values(this.state.errors).some(Boolean)) {
          this.props.store.dispatch(changeUserInfo, this.state.values);
        }
      },
    };
  }

  render() {
    const { values, errors } = this.state;
    return `
      <div class="update-user-info-content">
        <form class="update-user-info-form">
          <h1 class="update-user-info-title">
            Изменение данных
          </h1>
          <fieldset class="update-user-info-fieldset">
            {{{TextField
              value="${values.login}"
              error="${errors.login}"
              name="login"
              label="Логин"
              ref="login"
              type="text"
              placeholder="old login"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.email}"
              error="${errors.email}"
              name="email"
              label="Почта"
              type="text"
              placeholder="old email"
              ref="email"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.first_name}"
              error="${errors.first_name}"
              name="first_name"
              label="Имя"
              type="text"
              ref="first_name"
              placeholder="old first_name"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.second_name}"
              error="${errors.second_name}"
              name="second_name"
              label="Фамилия"
              ref="second_name"
              placeholder="old second_name"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.display_name}"
              error="${errors.display_name}"
              name="display_name"
              label="Имя в чате"
              ref="display_name"
              placeholder="old display_name"
              type="text"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.phone}"
              error="${errors.phone}"
              name="phone"
              ref="phone"
              placeholder="old phone"
              label="Телефон"
              type="text"
              onFocus=onFocus
            }}}
          </fieldset>
          <div class="update-user-info-contolr">
            {{{Button
              text="Сохранить"
              onClick=onSave
            }}}
          </div>
        </form>
      </div>
    `;
  }
}

export default withRouter(withStore(UpdateUserInfo));
