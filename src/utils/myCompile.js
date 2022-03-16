import Handlebars from 'Handlebars';

const myCompile = ({ template, props }) => Handlebars.compile(template)(props);

export default myCompile;
