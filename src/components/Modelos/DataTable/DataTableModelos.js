import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Popper,
} from '@material-ui/core';
import {
  AddCircleOutline as AddCircleOutlineIcon,
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import {
  useTable,
  useRowSelect,
  useResizeColumns,
  useFlexLayout,
} from 'react-table';

import DataExport from '../../../Export/DataExport';

import { IndeterminateCheckbox } from './IndeterminateCheckbox';

import { TableToolbar } from './TableToolbar';

import { HoverElement } from './HoverElement';

import { SearchField } from './SearchField';

import { ModelosCrud } from '../ModelosCrud';

import { useDataTableModelosContext } from './DataTableModelosContext';

const DataTableModelos = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [currentInstance, setCurrentInstance] = useState(undefined);
  const [hoverElementData, setHoverElementData] = useState(undefined);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalRemove, setModalRemove] = useState(false);
  const [modalExport, setModalExport] = useState(false);

  const {
    retrieveModelos,
    queryParams,
    count,
    page,
    perPage,
    perPageSizes,
    totalItens,
    order,
    orderKey,
    modelos,
    deleteAllModelos,
    handleSort,
    handlePageSizeChange,
    handlePageChange,
  } = useDataTableModelosContext();

  const columns = useMemo(
    () => [
      {
        Header: 'Modelo',
        accessor: 'modelo',
        order_key: 'modelo',
        Cell: (props) => {
          return (
            <span
              style={{
                color: 'blue',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={(e) => handleHoverElement(e, 'enter', props)}
              //onMouseLeave={(e) => handleHoverElement(e, 'leave', props)}
            >
              {props.value}
            </span>
          );
        },
      },
      {
        Header: 'Fabricante',
        accessor: 'fabricante.fabricante',
        order_key: 'id_fabricante',
      },
      {
        Header: 'Tamanho (U)',
        accessor: 'tamanho',
      },
      {
        Header: 'Processador',
        accessor: 'processador.processador',
        order_key: 'id_processador',
      },
      {
        Header: 'Sockets',
        accessor: 'sockets',
        order_key: 'sockets',
      },
      {
        Header: 'Cores',
        accessor: 'processador.cores',
        order_key: 'cores',
      },
      {
        Header: 'Clock',
        accessor: 'processador.clock',
        order_key: 'clock',
      },
      {
        Header: 'Memória (GB)',
        accessor: 'memoria_gb',
      },
      {
        Header: 'Ações',
        accessor: 'actions',
        Cell: (props) => {
          const instance = props.row;
          return (
            <div>
              <span
                onClick={() => handleUpdate(instance.original)}
                style={{ cursor: 'pointer' }}
              >
                <i className='fas fa-edit action'></i>
              </span>

              <span
                onClick={() => handleDelete(instance.original)}
                style={{ cursor: 'pointer', marginLeft: '5px' }}
              >
                <i className='fas fa-trash action'></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleHoverElement = (event, action, data) => {
    if (action === 'enter') {
      setAnchorEl(event.currentTarget);
      setHoverElementData(data);
    } else if (action === 'leave') {
      setAnchorEl(undefined);
      setHoverElementData(undefined);
    }
  };

  const handleUpdate = (instance) => {
    setCurrentInstance(instance);
    setModalUpdate(!modalUpdate);
  };

  const handleDelete = (instance) => {
    setCurrentInstance(instance);
    setModalRemove(!modalRemove);
  };

  useEffect(retrieveModelos, [page, perPage, order, orderKey]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: modelos,
    },
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 40,
          width: 40,
          maxWidth: 40,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {/* <CardHeader className={classes.header} title="Associações de Clusters, Datastores, Siglas e Ambientes" /> */}
          <div className='RtpsConfig-addButton'>
            <Tooltip title='Adicionar Modelo Físico'>
              <Button
                startIcon={<AddCircleOutlineIcon className={classes.addIcon} />}
                className={classes.addButton}
                variant='outlined'
                onClick={() => setModalCreate(!modalCreate)}
              >
                Adicionar Modelo
              </Button>
            </Tooltip>
          </div>
          <Grid container style={{ padding: '16px 0px 0px 16px' }}>
            <Grid item xs={12}>
              {selectedFlatRows.length > 0 && (
                <TableToolbar
                  instances={selectedFlatRows}
                  updateTable={retrieveModelos}
                />
              )}

              <div className='Hw-tables-bottom'>
                <div>
                  <p>
                    Total encontrado: <strong>{totalItens}</strong>
                  </p>
                </div>
                <div>
                  <DataExport
                    isOpen={modalExport}
                    toggleModal={() => setModalExport(!modalExport)}
                    resource='hw-modelos'
                    params={queryParams}
                  />
                </div>
              </div>

              <table
                className='table table-striped table-bordered'
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          <span
                            onClick={() => {
                              if (column.order_key)
                                handleSort(column.order_key);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {column.render('Header')}
                          </span>

                          {column.order_key === orderKey ? (
                            order === 'asc' ? (
                              <ArrowUpward
                                fontSize='small'
                                style={{ paddingBottom: '3px' }}
                              />
                            ) : (
                              <ArrowDownward
                                fontSize='small'
                                style={{ paddingBottom: '3px' }}
                              />
                            )
                          ) : null}

                          {column.id !== 'selection' && (
                            <SearchField column={column.id} />
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                {selectedFlatRows.map((d) => console.log('d', d))}
              </table>

              <div className='mt-3'>
                <p>
                  Registros por página:{' '}
                  <select onChange={handlePageSizeChange} value={perPage}>
                    {perPageSizes.map((size) => (
                      <option key={size} value={size}>
                        {size === totalItens ? 'Todos' : size}
                      </option>
                    ))}
                  </select>
                </p>

                <Pagination
                  className='my-3'
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant='outlined'
                  shape='rounded'
                  onChange={handlePageChange}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>

        {modalCreate && (
          <ModelosCrud
            isOpen={modalCreate}
            type={'create'}
            updateTable={retrieveModelos}
            toggleModal={() => setModalCreate(!modalCreate)}
          />
        )}

        {modalUpdate && (
          <ModelosCrud
            isOpen={modalUpdate}
            type={'update'}
            instanceData={currentInstance}
            updateTable={retrieveModelos}
            toggleModal={() => setModalUpdate(!modalUpdate)}
          />
        )}

        {modalRemove && (
          <ModelosCrud
            isOpen={modalRemove}
            type={'remove'}
            instanceData={currentInstance}
            updateTable={retrieveModelos}
            toggleModal={() => setModalRemove(!modalRemove)}
          />
        )}

        {hoverElementData && (
          <Popper
            id='popper-hover-element'
            open={Boolean(hoverElementData)}
            anchorEl={anchorEl}
            placement='top-start'
            disablePortal={false}
          >
            <HoverElement
              data={hoverElementData}
              handleHoverElement={handleHoverElement}
            />
          </Popper>
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiTableCell-root': {
      fontFamily: 'inherit',
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflow: 'auto',
  },
  header: {
    background: '#00000008',
    marginBottom: '15px',
    '& .MuiTypography-h5': {
      fontFamily: 'inherit',
      fontSize: '20px',
    },
  },
  addButton: {
    color: '#007acc',
    fontWeight: 'bold',
    fontSize: '17px',
  },
  addIcon: {
    color: '#007acc',
  },
}));

export default DataTableModelos;
