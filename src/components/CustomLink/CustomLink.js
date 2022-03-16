import myCompile from '../../utils/myCompile';
import createElementWithAttrs from '../../utils/createElementWithAttrs';
import template from './CustomLink.tmpl';
import './CustomLink.scss';

const CustomLink = ({ href, linkName, ...props }) => {
  createElementWithAttrs({
    elementName: 'a',
    attrs: {
      class: 'custom-link',
      href,
    },
    textContent: linkName,
  });

  return myCompile({ template, props });
};

export default CustomLink;
