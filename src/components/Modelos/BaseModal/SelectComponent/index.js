import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { CustomFormControl } from '../style';

export const SelectComponent = ({
  data,
  formik,
  name,
  type,
  label,
  ...props
}) => {
  return (
    <CustomFormControl
      fullWidth
      size='small'
      variant='outlined'
      required
      error={Boolean(formik.touched[name] && formik.errors[name])}
    >
      <InputLabel id={`modeloCrud${name}`}>Fabricante</InputLabel>
      <Select
        labelId={`modeloCrud${name}`}
        name={name}
        label={label}
        id={`modeloCrud${name}`}
        required
        value={formik.values[name] ? formik.values[name] : ''}
        error={Boolean(formik.touched[name] && formik.errors[name])}
        onChange={formik.handleChange}
      >
        {data?.map((item) => (
          <MenuItem key={item[type]} value={item[name]}>
            {item[type]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText
        error={Boolean(formik.touched[name] && formik.errors[name])}
      >
        {formik.errors[name] && 'Campo obrigatório'}
      </FormHelperText>
    </CustomFormControl>
  );
};
