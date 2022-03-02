import styled from '@emotion/styled';
import { TextField } from '@mui/material';



export const CustomTextField = styled(TextField)({
  fontSize: '8px',
  width: '100%',
  color: '#007ACC',
  margin: '10px',

  '& label.Mui-focused': {
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