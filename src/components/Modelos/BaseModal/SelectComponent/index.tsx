import { FormControlProps, FormHelperText, InputLabel, Select } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import { CustomFormControl } from '../style';

interface SelectComponentProps extends FormControlProps {
  /**
  * * Identify component value and index for props value and error
  */
  name?: string;
  /**
  * * Label for component 
  */
  label?: string;
  /**
  * * You set error in formik validation schema, key = camp name, ex: { name: 'Required field' }
  */
  errors?: { [key: string]: boolean | string };
  /**
  *    * You set value in formik and pass props ex: value={formik.values}, 
    this automatic capture value[name] ex: { values: { age: ''} }, this capture, formik.values.age.
    note: name prop need equal values from formik
  */
  value?: { [key: string]: string };
  /**
   *    * If true, the label is displayed as required and the input element is required.
   */
  required?: boolean;
  /**
   *    * Touched fields. Each key corresponds to a field that has been touched/visited.
   */
  touched?: { [key: string]: boolean };
  /**
  *    * Handle Function controller changes events in component, 
  you need to create handleChange or pass formik.handleChange. 
  */
  handleChange?: (e: ChangeEvent<any>) => void;
  /**
   *  * In children need to pass menuItem component, for select fields
   */
  children: ReactNode;

}

export const SelectComponent = ({
  errors,
  touched,
  handleChange,
  value,
  name,
  label,
  children,
  ...props
}: SelectComponentProps) => {
  return (
    <CustomFormControl
      fullWidth
      size='small'
      variant='outlined'
      required
      error={Boolean(touched[name] && errors[name])}
      {...props}
    >
      <InputLabel id={`modeloCrud${name}`}>Fabricante</InputLabel>
      <Select
        labelId={`modeloCrud${name}`}
        name={name}
        label={label}
        id={`modeloCrud${name}`}
        required
        value={value[name] ? value[name] : ''}
        error={Boolean(touched[name] && errors[name])}
        onChange={handleChange}
      >
        {children}
      </Select>
      <FormHelperText
        error={Boolean(touched[name] && errors[name])}
      >
        {errors[name] && 'Campo obrigatório'}
      </FormHelperText>
    </CustomFormControl>
  );
};
