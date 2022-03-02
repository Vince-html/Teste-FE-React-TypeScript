import { useFormik } from 'formik';

import * as Yup from 'yup';
import { SelectComponent } from '../Modelos/BaseModal/SelectComponent';
import { MenuItem } from '@mui/material';

const formSchema = Yup.object().shape({
  title: Yup.string().required('Precisa de um titulo'),
  age: Yup.number().integer().min(1).required('Campo obrigatório'),
  name: Yup.string(),
});


export const data = [
  { id: 1, fabricante: 'intel' },
  { id: 2, fabricante: 'amd' }
]

export function FormComponent() {

  const formik = useFormik({
    initialValues: {
      title: '',
      name: '',
      age: '0'
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm()
    }
  })

  const handleSubmitForm = () => {
    formik.handleSubmit()
  }


  console.log(formik.errors)

  return (
    <>

      <SelectComponent

        name="name"
        label="Name"
        value={formik.values}
        errors={formik.errors}
        touched={formik.touched}
        handleChange={formik.handleChange}>
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.fabricante}>
            {item.fabricante}
          </MenuItem>
        ))}
      </SelectComponent>
      <button type="submit" onClick={handleSubmitForm}>Click</button>
    </>
  )
}
