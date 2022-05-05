import Block from './Block';
import { isEqual } from './isEqual';
import renderDOM from './renderDOM';

export class Route {
  _pathname = '';

  _blockClass: typeof Block;

  _block: Block | null;

  _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._blockClass(this._props);

    renderDOM(this._block);
    return;
  }
}
