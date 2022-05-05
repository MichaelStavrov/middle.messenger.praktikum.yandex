import { changePassword } from '../../services/user';
import Block from '../../utils/Block';
import { BrowserRouter } from '../../utils/BrowserRouter';
import { Store } from '../../utils/Store';
import validateForm from '../../utils/validateForm';
import { withRouter } from '../../utils/withRouter';
import { withStore } from '../../utils/withStore';
import './UpdateUserPassword.scss';

interface UpdateUserPasswordProps {
  router: BrowserRouter;
  store: Store<AppState>;
  changePasswordError: () => string | null;
}
export class UpdateUserPassword extends Block<UpdateUserPasswordProps> {
  public static componentName = 'UpdateUserPassword';

  constructor(props: UpdateUserPasswordProps) {
    super(props);

    this.setProps({
      changePasswordError: () =>
        this.props.store.getState().changePasswordError,
    });
  }
  protected getStateFromProps() {
    this.state = {
      values: {
        password: '',
        newPassword: '',
        password_confirm: '',
      },
      errors: {
        password: '',
        newPassword: '',
        password_confirm: '',
      },
      onFocus: (e: FocusEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this.hideErrorMessage(inputElement);
      },
      onSave: (e: SubmitEvent) => {
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

        const nextState = {
          errors: { ...this.state.errors },
          values: { ...this.state.values },
        };

        const { newPassword, password_confirm } = this.state.values;
        if (newPassword !== password_confirm) {
          this.setProps({
            changePasswordError: () => 'Пароли должны совпадать',
          });
          return;
        }

        this.setState(nextState);

        if (!Object.values(this.state.errors).some(Boolean)) {
          this.props.store.dispatch(changePassword, {
            oldPassword: this.state.values.password,
            newPassword: this.state.values.newPassword,
          });
        }
      },
    };
  }

  render() {
    const { values, errors } = this.state;
    return `
      <div class="update-user-password-content">
        <form class="update-user-password-form">
          <h1 class="update-user-password-title">
            Изменение пароля
          </h1>
          <fieldset class="update-user-password-fieldset">
            {{{TextField
              value="${values.password}"
              error="${errors.password}"
              type="password"
              placeholder="Пароль"
              ref="password"
              name="password"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.newPassword}"
              error="${errors.newPassword}"
              ref="newPassword"
              type="password"
              placeholder="Новый пароль" 
              name="newPassword"
              onFocus=onFocus
            }}}
            {{{TextField
              value="${values.password_confirm}"
              error="${errors.password_confirm}"
              type="password"
              ref="password_confirm"
              placeholder="Пароль (еще раз)"
              name="password_confirm"
              onFocus=onFocus
            }}}
            {{{ErrorComponent value=changePasswordError}}}
            <div class="update-user-password-contolr">
              {{{Button
                type="submit"
                text="Сохранить"
                onClick=onSave
              }}}
            </div>
          </div>
        </form>
      </div>
    `;
  }
}

export default withRouter(withStore(UpdateUserPassword));
