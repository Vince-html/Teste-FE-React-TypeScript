import React, { createContext, useMemo, useContext, useRef, useState } from 'react';

import { ErrorRequestNotification, SuccessRequestNotification } from '../../../Utils/Notification'

import modelosDTService from "../../../../services/DataTableServices/Hardware/modelosDTService"

const DataTableModelosContext = createContext({});

const searchItems = {
  modelo: '',
  processador: '',
  fabricante: '',
  sockets: '',
  cores: '',
  clock: ''
}

const DataTableModelosContextDataProvider = ({ children }) => {
  const [modelos, setModelos] = useState([]);
  const [searchInstance, setSearchInstance] = useState(searchItems)
  const [order, setOrder] = useState("asc")
  const [orderKey, setOrderKey] = useState("modelo")
  const [totalItens, setTotalItens] = useState(0)
  const [queryParams, setQueryParams] = useState(undefined)
  const modelosRef = useRef();

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const perPageSizes = useMemo(() => {
    return [10, 20, 30, 40, 50, totalItens]
  }, [totalItens]);

  modelosRef.current = modelos;

  const onChangeSearchInstance = (key, value) => {
        const searchInstanceCache = {
          ...searchInstance,
          [key] : value
        }

        setSearchInstance(searchInstanceCache)
        retrieveModelos(getRequestParams(searchInstanceCache, page, perPage))
  };

  const getRequestParams = (searchInstance, page, perPage) => {
    let params = {};

    if (searchInstance) {

        if(searchInstance.modelo !== ''){
          params["modelo"] = searchInstance.modelo
        }

        if(searchInstance.processador !== ''){
          params["processador"] = searchInstance.processador
        }

        if(searchInstance.fabricante !== ''){
          params["fabricante"] = searchInstance.fabricante
        }

        if(searchInstance.sockets !== ''){
          params["sockets"] = searchInstance.sockets
        }

        if(searchInstance.cores){
          params["cores"] = searchInstance.cores
        }

        if(searchInstance.clock !== ''){
          params["clock"] = searchInstance.clock
        }
  
    }

    if (order) {
      params["order"] = order;
    }


    if (orderKey) {
      params["order_key"] = orderKey;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (perPage) {
      params["per_page"] = perPage;
    }

    return params;
  };

  const retrieveModelos = ( params = getRequestParams(searchInstance, page, perPage) ) => {

    setQueryParams(params)

    modelosDTService.getAll(params)
      .then((response) => {
        const { itens, total_pages, total_itens } = response.data;

        setModelos(itens);
        setCount(total_pages + 1);
        setTotalItens(total_itens)

      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAllModelos = () => console.log("deleteAll");

  //const deleteAssociacao = (rowIndex) => console.log("delete");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPerPage(event.target.value);
    setPage(1);
  };

  const handleSort = (column) => {
    if (column === 'selection')
      return

    setOrderKey(column)
    
    if (order === 'asc')
      setOrder('desc')
    else setOrder('asc')

  }


  return (
    <DataTableModelosContext.Provider 
      value={{ 
               retrieveModelos, 
               queryParams,
               count,
               page, 
               perPage, 
               perPageSizes,
               order, 
               orderKey, 
               modelos,
               deleteAllModelos,
               handleSort,
               handlePageChange,
               totalItens,
               handlePageSizeChange,
               searchInstance,
               onChangeSearchInstance
       }}
    >
      {children}
    </DataTableModelosContext.Provider>
  );
};

function useDataTableModelosContext() {
  const context = useContext(DataTableModelosContext);

  if (!context) {
    throw new Error('useDataTableModelosContext must be used wihin a DataTableModelosContextDataProvider');
  }

  return context;
}

export { useDataTableModelosContext, DataTableModelosContextDataProvider };
