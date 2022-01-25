import { createUseStyles } from 'react-jss';

export function useStyles(object: object) {
  const useStyle = createUseStyles(object);

  const classes = useStyle();

  return classes;
}
