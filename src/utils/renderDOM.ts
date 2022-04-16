import Block from './Block';

let root: HTMLElement | null = null;

export default function renderDOM(block: Block) {
  if (root) {
    const main = document.querySelector('#main-content');
    main!.appendChild(block.getContent());
    return;
  }

  root = document.querySelector('#root');

  root!.appendChild(block.getContent());
}
