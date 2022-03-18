import Handlebars from 'handlebars';

const myCompile = ({ template, props }) => Handlebars.compile(template)(props);

export default myCompile;
