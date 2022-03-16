import myCompile from '../../utils/myCompile';
import createElementWithAttrs from '../../utils/createElementWithAttrs';
import template from './TextField.tmpl';
import './TextField.scss';

const TextField = (props) => {
  createElementWithAttrs({
    elementName: 'input',
    attrs: {
      class: 'text-field-input',
      optional: {
        type: 'text',
      },
    },
  });

  return myCompile({ template, props });
};

export default TextField;
