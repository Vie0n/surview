export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  color: 'primary' | 'success' | 'danger' | 'info'
}