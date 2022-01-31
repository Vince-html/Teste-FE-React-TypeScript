
import { useTheme } from '@mui/material';
import { styled } from '@mui/material';
import { ButtonStyles } from './styles';




export function CustomComponent() {
  const theme = useTheme()
  console.log(theme)
  const classes = ButtonStyles()
  const MyButton = styled('button')(({ theme }) => ({
    backgroundColor: theme.colors.secondary500,
  }));
  return (
    <>
      <button className={classes.button}>Teste</button>
      <MyButton>Teste 2</MyButton>
    </>
  )
};