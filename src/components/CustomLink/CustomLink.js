import myCompile from '../../utils/myCompile';
import createElementWithAttrs from '../../utils/createElementWithAttrs';
import template from './CustomLink.tmpl';
import './CustomLink.scss';

const CustomLink = ({ href, linkName, activeLink, className, ...props }) => {
  let currentClass = '';
  if (activeLink && window.location.pathname === href) {
    currentClass = 'active-link';
  } else {
    currentClass = className ?? 'custom-link';
  }

  createElementWithAttrs({
    elementName: 'a',
    attrs: {
      class: currentClass,
      href,
    },
    textContent: linkName,
  });

  return myCompile({ template, props });
};

export default CustomLink;
