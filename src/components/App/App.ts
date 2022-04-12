import Header from '../Header';

import Block from '../../utils/Block';
import { registerComponent } from '../../utils';
import './App.scss';

registerComponent(Header);

export class App extends Block {
  protected render(): string {
    return `
      <div class="app">
        <header>
          {{{Header}}}
        </header>
        <main>
          <section class="page">
            <div id="main-content"></div>
          </section>
        </main>
      </div>
    `;
  }
}
