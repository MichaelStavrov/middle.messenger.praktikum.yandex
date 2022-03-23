import TextField from '../../components/TextField';
import myCompile from '../../utils/myCompile';
import template from './FormLayout.tmpl';
import './FormLayout.scss';

const FormLayout = (props) =>
  myCompile({
    template,
    props: {
      ...props,
      fields: props.fields.map((fieldProps) => TextField(fieldProps)),
    },
  });

export default FormLayout;
