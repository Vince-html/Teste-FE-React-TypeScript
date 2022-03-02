import { useFormik } from 'formik';
import { useState } from 'react';
import { CustomComponent } from '../../components/CustomCompo';
import DefaultLayout from '../../components/DefaultLayout';
import { FormComponent } from '../../components/Form';
import { FormComponent2 } from '../../components/Form copy';
import { InputText } from '../../components/InputText';
import { ModelosCrud } from '../../components/Modelos/ModelosCrud';
import { Summary } from '../../components/Summary';
import { TableService } from '../../components/TableService';

const Home = () => {


  return (
    <DefaultLayout>
      <FormComponent />
      <p> </p>
      <FormComponent2 />
      {/* <Summary />
      <CustomComponent />
      <TableService /> */}
    </DefaultLayout>
  );
}

export default Home;
