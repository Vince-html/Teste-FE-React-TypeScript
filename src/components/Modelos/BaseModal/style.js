import {
  Button,
  CardHeader,
  FormControl,
  Modal,
  styled,
  TextField,
} from '@mui/material';

export const ButtonContainer = styled('div')({
  display: 'flex',
  width: ' 100%',
  gap: '1rem',
  justifyContent: 'flex-end',
  marginTop: '1rem',
});

export const CustomButton = styled(Button)({
  padding: '0.5rem 1.5rem',
  background: '#007acc',
  color: 'white',
});

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

export const CustomCardHeader = styled(CardHeader)({
  '& span': {
    fontWeight: 'bold',
  },
});

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

export const WrapperTextField = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  maxWidth: '600px',

  '@media (max-width:760px)': {
    flexDirection: 'column',
  },
});

export const WrapperHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#007ACC',
  height: '4rem',
  color: 'white',
  fontFamily: 'Roboto',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    '& > svg': {
      fontSize: '1.5rem',
    },
    '& > h1': {
      fontSize: '1.5rem',
      fontFamily: 'Roboto',
    },
  },
  '& > svg': {
    fontSize: '2rem',
    cursor: 'pointer',
  },
});

export const CustomPadding = {
  padding: '0.5rem 1rem 0 1rem',
  fontWeight: 'bold',
};

export const ModalModeloServidor = styled(Modal)({
  padding: '50px',
  margin: 'auto',
  maxWidth: '1000px',
  '@media (max-width:760PX)': {
    padding: 0,
    overflow: 'scroll',
  },
});

export const CardSxStyle = {
  padding: '0.25rem 0.5rem 0.25rem 0.5rem ',
  maxWidth: '600px',
};
// export const ModalStyle = {
//   padding: '50px',
//   margin: 'auto',
//   maxWidth: '1000px',
//   '@media (max-width:600px)': {
//     overflow: 'scroll',
//   },
// };
export const WrapperModal = {
  background: '#FAFAFA',

  overflow: 'scroll',
  height: '100%',
  display: 'block',
};
