export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string,
  color: 'primary' | 'success' | 'danger' | 'info'
}