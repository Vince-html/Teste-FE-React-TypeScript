/* eslint-disable import/no-anonymous-default-export */
import { BaseTextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';
import { CustomTextField } from './styles';

export interface InputTextProps extends BaseTextFieldProps {
  /**
  *   *  Identify component value and index for props value and error
  */
  name?: string;
  /**
  *   *   Label for component 
  */
  label?: string;
  /**
  *   *   You set error in formik validation schema, key = camp name, ex: { name: 'Required field' }
  */
  errors?: { [key: string]: boolean | string };
  /**
  *   *   You set value in formik and pass props ex: value={formik.values}, 
    this automatic capture value[name] ex: { values: { age: ''} }, this capture, formik.values.age.
    note: name prop need equal values from formik
  */
  value?: { [key: string]: string };
  /**
   *    * If true, the label is displayed as required and the input element is required.
   */
  required?: boolean;
  /**
   * * Touched fields. Each key corresponds to a field that has been touched/visited.
   */
  touched?: { [key: string]: boolean };
  /**
  *   * Handle Function controller changes events in component, 
  you need to create handleChange or pass formik.handleChange. 
  */
  handleChange?: (e: ChangeEvent<any>) => void;
}

export const InputText = ({ errors, value, name = 'title', label = 'Title', required, handleChange, variant = 'outlined', touched, ...props }: InputTextProps) => {
  const tsProps = (() => {
    let tsVariant: { variant: "standard" | "outlined" | "filled"; };
    switch (variant) {
      case "outlined": {
        tsVariant = { variant: variant as "outlined" };
        break;
      }
      case "filled": {
        tsVariant = { variant: "filled" as "filled" };
        break;
      }
      case "standard":
      default: {
        tsVariant = { variant: "standard" as "standard" };
        break;
      }
    }
    const p = props;
    delete p.title;
    return { ...p, ...tsVariant };
  });
  return (
    <CustomTextField
      title='input'
      variant={variant}
      name={name}
      label={label}
      size='small'
      {...tsProps}
      value={value[name] ? value[name] : ''}
      onChange={handleChange}
      error={
        errors[name] && touched[name]
          ? Boolean(errors[name])
          : false
      }
      helperText={
        errors[name]
          ? errors[name]
          : ''
      }
    />
  );
};

