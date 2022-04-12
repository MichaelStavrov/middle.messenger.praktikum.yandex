export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  onSubmit?: (e?: SubmitEvent) => void;
}
