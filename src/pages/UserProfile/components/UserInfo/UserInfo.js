import template from './UserInfo.tmpl';
import myCompile from '../../../../utils/myCompile';
import './UserInfo.scss';

const UserInfo = (props) => myCompile({ template, props });

export default UserInfo;
