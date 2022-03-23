import myCompile from '../../utils/myCompile';
import template from './Page.tmpl';
import './Page.scss';

const Page = (props) => myCompile({ template, props });

export default Page;
