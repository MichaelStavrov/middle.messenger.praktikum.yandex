interface ValidateForm {
  errorsState: Record<string, string>;
  inputName: string;
  inputValue: string;
}

const validateForm = ({
  errorsState,
  inputName,
  inputValue,
}: ValidateForm): void => {
  switch (inputName) {
    case 'first_name':
    case 'second_name':
      if (!inputValue.match(/^[A-Z|А-Я]/)) {
        errorsState[inputName] = 'Должно быть с заглавной буквы';
      } else if (!inputValue.match(/^[(a-zA-Z)|(а-яА-Я)|-]+$/)) {
        errorsState[inputName] = 'Только буквы или знак дефиса';
      } else {
        errorsState[inputName] = '';
      }
      break;
    case 'login':
      if (inputValue.length < 3 || inputValue.length > 20) {
        errorsState[inputName] = 'От 3 до 20 символов';
      } else if (!inputValue.match(/^[(a-zA-Z)|\d|\-|_]+$/)) {
        errorsState[inputName] = 'Латиница, цифры без пробелов, знаки - или _';
      } else if (!inputValue.match(/[a-zA-Z]/)) {
        errorsState[inputName] = 'Минимум одна латинская буква';
      } else {
        errorsState[inputName] = '';
      }
      break;
    case 'email':
      if (!inputValue.match(/^[(a-zA-Z)|\d|-|@|.]+$/)) {
        errorsState[inputName] = 'Латиница, цифры без пробелов или дефис';
      } else if (!inputValue.match(/(@\w+\.)/)) {
        errorsState[inputName] = 'Email указан некорректно';
      } else {
        errorsState[inputName] = '';
      }
      break;
    case 'password':
      if (inputValue.length < 8 || inputValue.length > 40) {
        errorsState[inputName] = 'От 8 до 40 символов';
      } else if (!inputValue.match(/[A-Z]/)) {
        errorsState[inputName] = 'Хотя бы одна заглаваня буква';
      } else if (!inputValue.match(/\d/)) {
        errorsState[inputName] = 'Хотя бы одна цифра';
      } else {
        errorsState[inputName] = '';
      }
      break;
    case 'phone':
      if (inputValue.length < 10 || inputValue.length > 15) {
        errorsState[inputName] = 'От 10 до 15 символов';
      } else if (!inputValue.match(/^(\+|\d)(\d+$)/)) {
        errorsState[inputName] = 'Только цифры или первый +';
      } else {
        errorsState[inputName] = '';
      }
      break;
    case 'message':
      if (!inputValue) {
        errorsState[inputName] = 'Введите сообщение';
      } else {
        errorsState[inputName] = '';
      }
      break;
    default:
      break;
  }
};

export default validateForm;
