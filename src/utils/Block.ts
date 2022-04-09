import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

interface BlockMeta<P = any> {
  props: P;
}

interface ValidateForm {
  errorsState: Record<string, string>;
  inputName: string;
  inputValue: string;
}

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  // private readonly _meta: BlockMeta;

  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected state: any = {};
  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    // this._meta = {
    //   props,
    // };

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props || ({} as any));
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  protected getStateFromProps(props: any): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {}

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }
    console.log(nextProps);

    Object.assign(this.props as any, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    const input = this._element.querySelector('input');

    this._addEvents(input);
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: any): any {
    // const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, unknown>, prop: string, value: unknown) => {
        const oldProps = { ...target };
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldProps }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents(input: HTMLElement | null) {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    if (input) {
      Object.entries(events).forEach(([event, listener]) => {
        input.addEventListener(event, listener);
      });
    } else {
      Object.entries(events).forEach(([event, listener]) => {
        this._element!.addEventListener(event, listener);
      });
    }
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs,
    });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      /**
       * Заменяем заглушку на component._element
       */
      stub.replaceWith(component.getContent());
    });

    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  hideErrorMessage(inputElem: HTMLInputElement) {
    const parentElem = inputElem.parentElement;
    const errorElem = parentElem?.querySelector(
      '#text-field-error'
    ) as HTMLElement;
    errorElem.style.visibility = 'hidden';
  }

  validateForm({ errorsState, inputName, inputValue }: ValidateForm) {
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
          errorsState[inputName] =
            'Латиница, цифры без пробелов, знаки - или _';
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
      case 'password_confirm':
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
  }
}
