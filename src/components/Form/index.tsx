import { useFormik } from 'formik';
import React from 'react'
import { InputText } from '../InputText';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  title: Yup.string().required('Precisa de um titulo'),
  age: Yup.number().integer().min(1).required('Campo obrigatório'),
  name: Yup.string(),
});

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
      <InputText name="title" label="Title" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />
      <InputText name="age" label="age" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />
      <InputText name="name" label="Name" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />

      <button type="submit" onClick={handleSubmitForm}>Click</button>
    </>
  )
}
