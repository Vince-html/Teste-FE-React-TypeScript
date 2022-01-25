import { CustomTheme, useTheme } from '@mui/material';
import { useStyles } from '../../hooks/useStyles';

type ComponentClasses = {
  ca?: string;
  button?: string;
};

export function ButtonStyles() {
  const theme: CustomTheme = useTheme();

  const classes: ComponentClasses = useStyles({
    ca: {
      color: theme.colors.primary500,
    },

    button: {
      fontWeight: theme.fontWeight.regular,
      fontSize: theme.fontSize.small,
      color: theme.colors.secondary500,
      backgroundColor: theme.colors.text500,
      minWidth: '150px',
      border: 'none',
      padding: '5px 10px',
    },
  });

  return classes;
}
