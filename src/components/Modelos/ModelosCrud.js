import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import API, { endpointsCadastro } from '../../../services/API';

// import modelosDTService from '../../../services/DataTableServices/Hardware/modelosDTService';

// import { ModelosCrudFields } from './ModelosCrudFields';
import BaseModal from './BaseModal';

const formSchema = Yup.object().shape({
  modelo: Yup.string().required('Campo obrigatório'),
  id_fabricante: Yup.number().integer().min(1).required('Campo obrigatório'),
  tamanho: Yup.number(),
  id_processador: Yup.number().integer().min(1).required('Campo obrigatório'),
  memoria_gb: Yup.number().integer().min(1).required('Campo obrigatório'),
  int_ethernet_1g: Yup.number().min(1).required('Campo obrigatório'),
  type_ethernet_1g: Yup.number(),
  int_ethernet_10g: Yup.number(),
  type_ethernet_10g: Yup.number(),
  cap_hba_gb: Yup.number(),
  int_hba: Yup.number(),
  type_hba: Yup.number(),
  qtde_hdd: Yup.number(),
  cap_hdd_gb: Yup.number(),
  qtde_ssd: Yup.number(),
  cap_ssd_gb: Yup.number(),
  qtde_nvme: Yup.number(),
  cap_nvme_gb: Yup.number(),
  sockets: Yup.number().integer().min(1).required('Campo obrigatório'),
});

export const ModelosCrud = ({
  isOpen,
  toggleModal,
  instanceData,
  type,
  updateTable,
}) => {
  const [fabricanteList, setFabricanteList] = useState(undefined);
  const [processadorList, setProcessadorList] = useState(undefined);
  const [saveAndAddOther, setSaveAndAddOther] = useState(false);
  const [listFiles, setListFiles] = useState();

  const formik = useFormik({
    initialValues: {
      modelo: instanceData?.modelo ?? '',
      id_fabricante: instanceData?.id_fabricante ?? 0,
      tamanho: instanceData?.tamanho ?? 0,
      id_processador: instanceData?.id_processador ?? 0,
      memoria_gb: instanceData?.memoria_gb ?? 0,
      int_ethernet_1g: instanceData?.int_ethernet_1g ?? 0,
      type_ethernet_1g: instanceData?.type_ethernet_1g ?? 0,
      int_ethernet_10g: instanceData?.int_ethernet_10g ?? 0,
      type_ethernet_10g: instanceData?.type_ethernet_10g ?? 0,
      cap_hba_gb: instanceData?.cap_hba_gb ?? 0,
      int_hba: instanceData?.int_hba ?? 0,
      type_hba: instanceData?.type_hba ?? 0,
      qtde_hdd: instanceData?.qtde_hdd ?? 0,
      cap_hdd_gb: instanceData?.cap_hdd_gb ?? 0,
      qtde_ssd: instanceData?.qtde_ssd ?? 0,
      cap_ssd_gb: instanceData?.cap_ssd_gb ?? 0,
      qtde_nvme: instanceData?.qtde_nvme ?? 0,
      cap_nvme_gb: instanceData?.cap_nvme_gb ?? 0,
      sockets: instanceData?.sockets ?? 0,
      versoes_software: instanceData?.versoes_software ?? [],
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const payload = {
        modelo: values.modelo,
        id_fabricante: values.id_fabricante,
        tamanho: parseInt(values.tamanho),
        id_processador: values.id_processador,
        memoria_gb: parseInt(values.memoria_gb),
        int_ethernet_1g: parseInt(values.int_ethernet_1g),
        type_ethernet_1g: parseInt(values.type_ethernet_1g),
        int_ethernet_10g: parseInt(values.int_ethernet_10g),
        type_ethernet_10g: parseInt(values.type_ethernet_10g),
        cap_hba_gb: parseInt(values.cap_hba_gb),
        int_hba: parseInt(values.int_hba),
        type_hba: parseInt(values.type_hba),
        qtde_hdd: parseInt(values.qtde_hdd),
        cap_hdd_gb: parseInt(values.cap_hdd_gb),
        qtde_ssd: parseInt(values.qtde_ssd),
        cap_ssd_gb: parseInt(values.cap_ssd_gb),
        qtde_nvme: parseInt(values.qtde_nvme),
        cap_nvme_gb: parseInt(values.cap_nvme_gb),
        sockets: parseInt(values.sockets),
        versoes_software: listFiles,
      };
      console.log(payload);
      if (type === 'create') {
        console.log(payload);
        // modelosDTService
        //   .create(payload)
        //   .then(() => {
        //     SuccessRequestNotification({
        //       notificationText: `Modelo adicionado com sucesso!`,
        //     });
        //     updateTable();
        //   })
        //   .catch((e) => {
        //     ErrorRequestNotification({
        //       notificationText: e.response.data.message,
        //       timeout: 7000,
        //     });
        //     console.log('modelosDTServiceCreate-Error', e);
        //   });
      }
      if (type === 'update') {
        // modelosDTService
        //   .update({ ...payload, id_modelo: instanceData?.id_modelo })
        //   .then(() => {
        //     SuccessRequestNotification({
        //       notificationText: `Modelo alterado com sucesso!`,
        //     });
        //     updateTable();
        //   })
        //   .catch((e) => {
        //     ErrorRequestNotification({
        //       notificationText: e.response.data.message,
        //       timeout: 7000,
        //     });
        //     console.log('modelosDTServiceCreate-Error', e);
        //   });
      }
      if (type === 'remove') {
        // modelosDTService
        //   .delete(instanceData?.id_modelo)
        //   .then(() => {
        //     SuccessRequestNotification({
        //       notificationText: `Modelo removido com sucesso!`,
        //     });
        //     updateTable();
        //   })
        //   .catch((e) => {
        //     ErrorRequestNotification({
        //       notificationText: e.response.data.message,
        //       timeout: 7000,
        //     });
        //     console.log('modelosDTServiceDelete-Error', e.response.data);
        //   });
      }

      if (!saveAndAddOther) toggleModal();
    },
  });

  useEffect(() => {
    requestFabricanteList();
    requestProcessadorList();
  }, []);

  const requestFabricanteList = () => {
    // API.get(endpointsCadastro.FABRICANTE, { params: { page: 0, per_page: 0 } })
    //   .then((response) => {
    //     const data = response.data.itens;
    //     setFabricanteList(data);
    //   })
    //   .catch((e) => console.log('requestFabricanteList-Error', e));
  };

  const requestProcessadorList = () => {
    // API.get(endpointsCadastro.PROCESSADOR, { params: { page: 0, per_page: 0 } })
    //   .then((response) => {
    //     const data = response.data.itens;
    //     setProcessadorList(data);
    //   })
    //   .catch((e) => console.log('requestProcessadorList-Error', e));
  };
  useEffect(() => {
    setListFiles(formik.values.versoes_software);
  }, [formik.values.versoes_software]);

  const handleSave = () => {
    setSaveAndAddOther(false);
    formik.handleSubmit();
  };

  const handleSaveAndAddOther = () => {
    setSaveAndAddOther(true);
    formik.handleSubmit();
  };

  return (
    <>
      {/* {type === 'update-batch' && (
        <ModelosCrudFields
          formik={formik}
          fabricanteList={fabricanteList}
          processadorList={processadorList}
        />
      )} */}

      {type !== 'update-batch' && (
        <BaseModal
          isOpen={isOpen}
          fabricanteList={fabricanteList}
          processadorList={processadorList}
          title={
            type === 'update'
              ? 'Editar modelo de servidor'
              : type === 'remove'
              ? 'Remover modelo de servidor'
              : 'Adicionar novo modelo de servidor'
          }
          icon={
            type === 'update'
              ? EditIcon
              : type === 'remove'
              ? DeleteIcon
              : AddCircleOutlineIcon
          }
          type={type}
          formik={formik}
          toggle={toggleModal}
          handleSave={handleSave}
          listFiles={listFiles}
          setListFiles={setListFiles}
        />

        // <MaterialUIModal
        //   show={isOpen}
        //   toggle={toggleModal}
        //   size='xl'
        //   icon={
        //     type === 'update'
        //       ? EditIcon
        //       : type === 'remove'
        //       ? DeleteIcon
        //       : AddCircleOutlineIcon
        //   }
        //   title={
        //     type === 'update'
        //       ? 'Editar Modelo'
        //       : type === 'remove'
        //       ? 'Remover Modelo'
        //       : 'Adicionar Modelo'
        //   }
        //   action={'multi'}
        //   actionTitle={
        //     type === 'update'
        //       ? ['Salvar']
        //       : type === 'create'
        //       ? ['Salvar', 'Salvar e adicionar outro']
        //       : ['Confirmar']
        //   }
        //   actionFunction={
        //     type === 'update'
        //       ? [handleSave]
        //       : type === 'create'
        //       ? [handleSave, handleSaveAndAddOther]
        //       : [formik.handleSubmit]
        //   }
        //   //actionDisabled
        // >
        //   <>
        //     {type !== 'remove' && (
        //       <ModelosCrudFields
        //         formik={formik}
        //         fabricanteList={fabricanteList}
        //         processadorList={processadorList}
        //       />
        //     )}

        //     {type === 'remove' && (
        //       <div className='form-CrudUors-remove '>
        //         <p>
        //           Deseja mesmo remover o Modelo{' '}
        //           <span>{formik.values.modelo}</span>?
        //         </p>
        //       </div>
        //     )}
        //   </>
        // </MaterialUIModal>
      )}
    </>
  );
};
