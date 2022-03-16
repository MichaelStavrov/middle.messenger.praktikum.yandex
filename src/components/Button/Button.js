import myCompile from '../../utils/myCompile';
import createElementWithAttrs from '../../utils/createElementWithAttrs';
import template from './Button.tmpl';
import './Button.scss';

const Button = ({ buttonText, ...props }) => {
  createElementWithAttrs({
    elementName: 'button',
    attrs: {
      class: 'button',
      optional: {
        type: 'button',
      },
    },
    textContent: buttonText,
  });

  return myCompile({ template, props });
};

export default Button;
