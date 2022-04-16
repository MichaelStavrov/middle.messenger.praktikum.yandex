import Block from '../../utils/Block';
import './App.scss';

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
