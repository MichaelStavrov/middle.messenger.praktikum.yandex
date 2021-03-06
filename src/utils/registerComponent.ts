import Block, { BlockClass } from './Block';
import Handlebars, { HelperOptions } from 'handlebars';
import { UserOptionsProps } from '../pages/UserProfile/components/UserOptions/types';

interface BlockConstructable<Props = any> {
  new (props: Props): Block;
  componentName?: string;
}

export default function registerComponent<Props = any>(
  Component: BlockConstructable
) {
  Handlebars.registerHelper(
    Component.componentName || Component.name,
    function (
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions
    ) {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof hash[key] === 'string') {
          hash[key] = hash[key].replace(
            new RegExp(`{{${String(key)}}}`, 'i'),
            this[key]
          );
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component.getContent();
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
}
