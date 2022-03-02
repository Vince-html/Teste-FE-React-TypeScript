import React from 'react';
import { 
  render, 
  screen, 
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';

import API from '../../../services/API';

import { UploadFiles } from '..';


jest.mock("../../../services/API", () => {
  return {
    get: jest.fn(() => Promise.resolve()),
    post: jest.fn(() => Promise.resolve()),
    put: jest.fn(() => Promise.resolve()),
    delete: jest.fn(() => Promise.resolve()),
    endpointsCadastro: { INTEGRACAO_S3 : 'fake-url' },
  }
})

global.confirm = () => true

const arquivo = 'arquivo-fake.png';
const descricao = 'Teste arquivo';
const listaArquivos = {
  data: {
    itens: [
      {
        arquivo: arquivo,
        content_type: "image/png",
        contentsha256: "d7cc9365d16d56ca7fea554585c2d5a08f995ee25a0725b584dc6fcc51474efc",
        descricao: descricao,
        tamanho: "172393",
        ultima_modificacao: "2022-01-31T11:08:59-03:00",
        versao: "1.5",
      }
    ]
  }
};

describe('Componente UploadFiles', () => {
  describe('Tela inicial', () => {
    it('renderizou corretamente', async () => {
      render(<UploadFiles />);
      
      await waitFor(() => {
        return expect(screen.getByTestId('buttonAdd')).toBeInTheDocument();
      })
    })

    it('consultou a lista de arquivos no S3', async () => {
      render(<UploadFiles />)
      
      await waitFor(() => {
        return expect(API.get).toHaveBeenCalledTimes(2);
      })
    })

    it('loading icon aparece e some ao carregar a lista de arquivos', async () => {
      API.get.mockResolvedValueOnce({})

      render(<UploadFiles />)

      await waitForElementToBeRemoved(screen.queryByTestId("loadingListFiles"))
    })

    it('apareceu a mensagem de nenhum arquivo encontrado', async () => {
      API.get.mockResolvedValueOnce({})

      render(<UploadFiles />)

      await waitFor(() => {
        return expect(screen.getByText("Nenhum arquivo encontrado!")).toBeInTheDocument();
      })
    })

    it('listou os arquivos', async () => {
      API.get.mockResolvedValueOnce(listaArquivos)

      render(<UploadFiles />)
      
      await waitFor(() => {
        return expect(screen.getByText(arquivo)).toBeInTheDocument();
      })
    })

    it('abre a modal de cadastro de arquivos ao clicar no botão de adicionar', async () => {
      render(<UploadFiles />)
      
      fireEvent.click(screen.getByTestId('buttonAdd'))

      await waitFor(() => {
        return expect(screen.getByTestId('editFile')).toBeInTheDocument();
      })
    })

    it('abre a modal de edição de arquivos ao clicar no icone de edição', async () => {
      API.get.mockResolvedValueOnce(listaArquivos)

      render(<UploadFiles />)
      
      fireEvent.click(await screen.findByTestId('iconEditFile'))

      await waitFor(() => {
        return expect(screen.getByText(descricao)).toBeInTheDocument();
      })
    })

    it('deleta um arquivo ao clicar no icone de delete', async () => {
      API.get.mockResolvedValueOnce(listaArquivos)

      render(<UploadFiles />)
      
      fireEvent.click(await screen.findByTestId('iconDeleteFile'))

      await waitForElementToBeRemoved(screen.getByText(arquivo));
    })

    it('faz download do arquivo', async () => {
      API.get.mockResolvedValueOnce(listaArquivos)

      render(<UploadFiles />)
      
      fireEvent.click(await screen.findByTestId('linkDownloadArquivo'))

      await waitForElementToBeRemoved(screen.getByTestId('loadingDownloadFile'));
    })
  })
})