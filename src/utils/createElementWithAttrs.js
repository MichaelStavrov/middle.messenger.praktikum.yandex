import Handlebars from 'Handlebars';

const createElementWithAttrs = ({ elementName, attrs, textContent }) => {
  Handlebars.registerHelper(elementName, (context) => {
    const { root } = context.data;

    const attributes = Object.entries({ ...attrs, ...root })
      .map(([key, value]) =>
        key === 'optional'
          ? Object.entries(value).map(
              ([key, value]) => `${key}=${root[key] ?? value}`
            )
          : `${key}='${value}'`
      )
      .join(' ');

    const elementWithAttrs = `${elementName} ${attributes}`;

    return textContent
      ? `
        <${elementWithAttrs}>
          ${textContent}
        </${elementName}>
      `
      : `
        <${elementWithAttrs}/>
      `;
  });
};

export default createElementWithAttrs;
