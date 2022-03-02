import React from 'react';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { MdAddCircleOutline } from 'react-icons/md';

import { CancelOutlined } from '@mui/icons-material/CancelOutlined';
import {
  ButtonContainer,
  CardSxStyle,
  CustomCardHeader,
  CustomPadding,
  CustomButton,
  ModalModeloServidor,
  WrapperHeader,
  WrapperModal,
  WrapperTextField,
} from './style';

import { InputText } from '../../InputText';
import { SelectComponent } from './SelectComponent';

import { Card, CardContent, Box } from '@mui/material';

export default function BaseModal({
  isOpen,
  fabricanteList,
  processadorList,
  formik,
  title,
  toggle,
  icon,
  handleSave,
  type,
  listFiles,
  setListFiles,
}) {
  const Icon = icon ? icon : undefined;

  function handleClick() {
    handleSave();
  }

  const handleAddFile = (file) => {
    setListFiles((prevState) => [...prevState, file]);
  };

  const handleRemoveFile = (file) => {
    const newListFiles = listFiles.filter(
      (item) => item.arquivo !== file.arquivo
    );

    setListFiles(newListFiles);
  };

  return (
    <>
      <ModalModeloServidor open={isOpen} onClose={toggle}>
        <div style={WrapperModal}>
          <WrapperHeader>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '1rem',
              }}
            >
              {icon && <Icon />}
              {/* <MdAddCircleOutline /> */}
              <h1 style={{ margin: 0, fontFamily: 'Lato' }}>{title}</h1>
            </div>

            <CancelOutlined onClick={toggle} style={{ marginRight: '1rem' }} />
          </WrapperHeader>
          <Box style={{ padding: '1rem' }}>
            <Card style={{ padding: '1rem', fontSize: '0.7rem' }}>
              <CustomCardHeader
                title='Definição'
                titleTypographyProps={{ variant: 'subtitle1' }}
                style={CustomPadding}
              />
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <InputText formik={formik} name='modelo' label='Modelo' />
                  <SelectComponent
                    data={fabricanteList}
                    name='id_fabricante'
                    label='Fabricante'
                    formik={formik}
                    type='fabricante'
                  />
                </WrapperTextField>
              </CardContent>
              <CustomCardHeader
                title='Processamento e Memória'
                titleTypographyProps={{ variant: 'subtitle1' }}
                style={CustomPadding}
              />
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <SelectComponent
                    data={processadorList}
                    name='id_processador'
                    label='Processador'
                    formik={formik}
                    type='processador'
                  />

                  <InputText
                    formik={formik}
                    required
                    name='sockets'
                    label='Sockets'
                  />
                  <InputText
                    formik={formik}
                    name='tamanho'
                    label='Tamanho(U)'
                  />
                  <InputText
                    formik={formik}
                    name='memoria_gb'
                    label='Memória(GB)'
                    required
                  />
                </WrapperTextField>
              </CardContent>
              <CustomCardHeader
                title='Conectividade'
                titleTypographyProps={{ variant: 'subtitle1' }}
                style={CustomPadding}
              />
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <InputText
                    formik={formik}
                    name='int_ethernet_1g'
                    label='Interfaces Ethernet (1GB)'
                    required
                  />
                  <InputText
                    formik={formik}
                    name='int_ethernet_10g'
                    label='Interfaces Ethernet (10GB)'
                  />
                </WrapperTextField>
              </CardContent>
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <InputText
                    formik={formik}
                    name='type_hba'
                    label='Tipo HBA (N˚ Portas)'
                  />
                  <InputText
                    formik={formik}
                    name='cap_hba_gb'
                    label='Velocidade HBA (GB/s)'
                  />
                  <InputText
                    formik={formik}
                    name='int_hba'
                    label='Interfaces HBA'
                  />
                </WrapperTextField>
              </CardContent>
              <CustomCardHeader
                title='Armazenamento'
                titleTypographyProps={{ variant: 'subtitle1' }}
                style={CustomPadding}
              />
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <InputText
                    formik={formik}
                    name='qtde_hdd'
                    label='Quantidade HDD'
                  />
                  <InputText
                    formik={formik}
                    name='qtde_ssd'
                    label='Quantidade SSD'
                  />
                  <InputText
                    formik={formik}
                    name='qtde_nvme'
                    label='Quantidade NVME'
                  />
                </WrapperTextField>
              </CardContent>
              <CardContent style={CardSxStyle}>
                <WrapperTextField>
                  <InputText
                    formik={formik}
                    name='cap_hdd_gb'
                    label='Capacidade HDD (GB)'
                  />
                  <InputText
                    formik={formik}
                    name='cap_ssd_gb'
                    label='Capacidade SSD (GB)'
                  />
                  <InputText
                    formik={formik}
                    name='cap_nvme_gb'
                    label='Capacidade NVME (GB)'
                  />
                </WrapperTextField>
              </CardContent>
              <CustomCardHeader
                title='Arquivos de Firmware'
                titleTypographyProps={{ variant: 'subtitle1' }}
                style={CustomPadding}
              />
              {/* <UploadFiles
                listFiles={listFiles}
                handleAddFile={handleAddFile}
                handleRemoveFile={handleRemoveFile}
              /> */}
            </Card>
            <ButtonContainer>
              {type === 'create' && (
                <CustomButton>Salvar e Adicionar outro</CustomButton>
              )}
              <CustomButton onClick={handleClick}>Salvar</CustomButton>
            </ButtonContainer>
          </Box>
        </div>
      </ModalModeloServidor>
    </>
  );
}
