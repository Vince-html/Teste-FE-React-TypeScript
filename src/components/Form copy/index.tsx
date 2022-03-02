import { useFormik } from 'formik';
import React from 'react'
import { InputText } from '../InputText';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  Camada: Yup.string().required('Campo obrigatório'),
  senha: Yup.number().integer().min(1).required('Campo obrigatório'),
  ip: Yup.string(),
});

export function FormComponent2() {

  const formik = useFormik({
    initialValues: {
      Camada: '',
      ip: '',
      senha: '0'
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


  return (
    <>
      <InputText name="Camada" label="Camada" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />
      <InputText name="senha" label="senha" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />
      <InputText name="ip" label="Ip" value={formik.values} errors={formik.errors} touched={formik.touched} handleChange={formik.handleChange} />

      <button type="submit" onClick={handleSubmitForm}>Click</button>
    </>
  )
}
