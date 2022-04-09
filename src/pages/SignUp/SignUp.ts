import Block from '../../utils/Block';
import './SignUp.scss';

// interface ValidateForm {
//   errorsState: Record<string, string>;
//   inputName: string;
//   inputValue: string;
// }

// const validateForm = ({ errorsState, inputName, inputValue }: ValidateForm) => {
//   switch (inputName) {
//     case 'first_name':
//     case 'second_name':
//       if (!inputValue.match(/^[A-Z|А-Я]/)) {
//         errorsState[inputName] = 'Имя должно быть с заглавной буквы';
//       } else if (!inputValue.match(/^[(a-zA-Z)|(а-яА-Я)|-]+$/)) {
//         errorsState[inputName] = 'Только буквы или знак дефиса';
//       } else {
//         errorsState[inputName] = '';
//       }
//       break;
//     case 'login':
//       if (inputValue.length < 3 || inputValue.length > 20) {
//         errorsState[inputName] = 'От 3 до 20 символов';
//       } else if (!inputValue.match(/^[(a-zA-Z)|\d|\-|\_]+$/)) {
//         errorsState[inputName] = 'Латиница, цифры без пробелов, знаки - или _';
//       } else if (!inputValue.match(/[a-zA-Z]/)) {
//         errorsState[inputName] = 'Минимум одна латинская буква';
//       } else {
//         errorsState[inputName] = '';
//       }
//       break;
//     case 'email':
//       if (!inputValue.match(/^[(a-zA-Z)|\d|-|@|.]+$/)) {
//         errorsState[inputName] = 'Латиница, цифры без пробелов, знаки -';
//       } else if (!inputValue.match(/(@\w+\.)/)) {
//         errorsState[inputName] = 'Обязательно знак @, латиница и точка';
//       } else {
//         errorsState[inputName] = '';
//       }
//       break;
//     case 'password':
//     case 'password_confirm':
//       if (inputValue.length < 8 || inputValue.length > 40) {
//         errorsState[inputName] = 'От 8 до 40 символов';
//       } else if (!inputValue.match(/[A-Z]/)) {
//         errorsState[inputName] = 'Хотя бы одна заглаваня буква';
//       } else if (!inputValue.match(/\d/)) {
//         errorsState[inputName] = 'Хотя бы одна цифра';
//       } else {
//         errorsState[inputName] = '';
//       }
//       break;
//     case 'phone':
//       if (inputValue.length < 10 || inputValue.length > 15) {
//         errorsState[inputName] = 'От 10 до 15 символов';
//       } else if (!inputValue.match(/^(\+|\d)(\d+$)/)) {
//         errorsState[inputName] = 'Только цифры или первый +';
//       } else {
//         errorsState[inputName] = '';
//       }
//       break;
//     default:
//       break;
//   }
// };

export class SignUpPage extends Block {
  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
        password_confirm: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
      },
      errors: {
        login: '',
        password: '',
        password_confirm: '',
        first_name: '',
        second_name: '',
        email: '',
        phone: '',
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
      onLogin: (e: SubmitEvent) => {
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

  render() {
    const { errors, values } = this.state;

    return `
      <div class="sign-up-content">
        <form class="sign-up-form" id="sign-up-form">
          <h1 class="sign-up-form-title">
            Регистрация
          </h1>
          <fieldset class="sign-up-form-fieldset">
          {{{TextField
            error="${errors.email}"
            value="${values.email}"
            type="text"
            placeholder="Email"
            name="email"
            onFocus=onFocus
          }}} 
          {{{TextField
            value="${values.login}"
            error="${errors.login}"
            type="text"
            placeholder="Логин"
            name="login"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.first_name}"
            error="${errors.first_name}"
            type="text"
            placeholder="Имя"
            name="first_name"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.second_name}"
            error="${errors.second_name}"
            type="text"
            placeholder="Фамилия"
            name="second_name"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.phone}"
            error="${errors.phone}"
            type="text"
            placeholder="Телефон"
            name="phone"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.password}"
            error="${errors.password}"
            type="password"
            placeholder="Пароль"
            name="password"
            onFocus=onFocus
          }}}
          {{{TextField
            value="${values.password_confirm}"
            error="${errors.password_confirm}"
            type="password"
            placeholder="Пароль (еще раз)"
            name="password_confirm"
            onFocus=onFocus
          }}}
          </fieldset>
          <div class="sign-up-form-contolrs">
            {{{Button
              type="submit"
              text="Зарегистрироваться"
              onClick=onLogin
            }}}
            {{{CustomLink
              text="Войти"
              href="/sign-in"
            }}}
          </div>
        </form>
      </div>
    `;
  }
}

// textFields: [
//   {
//     value: '',
//     error: '',
//     ref: 'email',
//     id: 'sign-up-email',
//     type: 'text',
//     placeholder: 'Email',
//     name: 'email',
//   },
//   {
//     value: '',
//     error: '',
//     ref: 'login',
//     id: 'sign-up-login',
//     type: 'text',
//     placeholder: 'login',
//     name: 'login',
//   },
// ];
