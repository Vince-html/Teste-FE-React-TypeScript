import React from 'react';
import { 
  render, 
  screen, 
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';

import API from '../../../services/API';

import { EditFile } from '../editFile';


jest.mock("../../../services/API", () => {
  return {
    get: jest.fn(() => Promise.resolve()),
    post: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    endpointsCadastro: { INTEGRACAO_S3 : 'fake-url' },
  }
})

jest.mock('../sha256sum', () => {
  return {
    hashfile: jest.fn(() => Promise.resolve('hash-fake'))
  }
})

const setup = (props = {}) => {
  const handleEditFile = jest.fn();
  const dataEditFile = {open: true, action: 'new', file: null};
  const setRefreshListFiles = jest.fn();

  const renderResult = render(
    <EditFile 
      handleEditFile={handleEditFile} 
      data={dataEditFile} 
      setRefreshListFiles={setRefreshListFiles}/>
  )

  return { 
    handleEditFile,
    refreshList: setRefreshListFiles,
    ...renderResult 
  }
}

describe('Componente UploadFiles', () => {
  describe('Tela de upload/edição de arquivos', () => {
    it('renderizou corretamente', () => {
      setup()

      expect(screen.getByTestId('editFile')).toBeInTheDocument();
    })

    it('chama a função de close ao clicar no ícone de fechar', () => {
      const { handleEditFile } = setup()
      
      fireEvent.click(screen.getByTestId('iconClose'))

      expect(handleEditFile).toBeCalledTimes(1)
    })

    it('apresenta mensagens de erro ao clicar em submit com campos vazios', async () => {
      setup()
      
      fireEvent.click(screen.getByTestId('buttonSubmit'))

      await waitFor(() => {
        expect(screen.getByTestId('errorFile')).toBeInTheDocument()
        expect(screen.getByTestId('errorDescription')).toBeInTheDocument()
        expect(screen.getByTestId('errorVersion')).toBeInTheDocument()
      });
    })

    let file;
    beforeEach(() => {
      file = new File(['teste'], "arquivo-fake.png", { type: "image/png" });
    })

    it('mensagens de erro somem ao preencher os campos', async () => {
      setup()
      
      await waitFor(() => fireEvent.click(screen.getByTestId('buttonSubmit')));

      fireEvent.change(screen.getByTestId('inputFile'), {target: {files: [file]}})
      fireEvent.change(screen.getByTestId('inputDescription'), {target: {value: 'Descricao fake'}})
      fireEvent.change(screen.getByTestId('inputVersion'), {target: {value: '1.0'}})

      await waitFor(() => {
        expect(screen.queryByTestId('errorFile')).not.toBeInTheDocument()
        expect(screen.queryByTestId('errorDescription')).not.toBeInTheDocument()
        expect(screen.queryByTestId('errorVersion')).not.toBeInTheDocument()
      });
    })
  })
})