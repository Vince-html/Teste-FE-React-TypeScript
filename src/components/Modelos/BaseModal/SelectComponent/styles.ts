import styled from '@emotion/styled';
import { FormControl } from '@mui/material';

export const CustomFormControl = styled(FormControl)({
  fontSize: '8px',
  width: '100%',
  color: '#007ACC',

  '& svg': {
    color: '#007ACC',
  },

  '& .MuiSelect-select:focus': {
    color: '#007ACC',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#007ACC',
    },
    '&:hover fieldset': {
      borderColor: '#007ACC',
      borderWidth: '2px',
    },
  },
});