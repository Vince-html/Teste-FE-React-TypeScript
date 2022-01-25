import { ButtonStyles } from './styles';

export function CustomComponent() {
  const classes = ButtonStyles()
  return <button className={classes.button}>Teste</button>
}