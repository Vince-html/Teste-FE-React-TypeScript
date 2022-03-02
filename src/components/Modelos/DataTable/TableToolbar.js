import React,  { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@material-ui/icons';

// import { ModelosCrudBatch } from '../ModelosCrudBatch'

import { ErrorRequestNotification, SuccessRequestNotification } from '../../../Utils/Notification'

import modelosDTService from '../../../../services/DataTableServices/Hardware/modelosDTService'

export const TableToolbar = ({ instances, updateTable  }) => {
    const classes = useStyles();
    //const [editModal, setEditModal] = useState(false)

    const handleDelete = () => {
     if (window.confirm(`Você confirma a remoção dos servidores :
      ${instances.map(instance => `${instance.original.modelo}` )}?`)) 
      {    
        instances.forEach(instance =>{
          modelosDTService.delete(instance.original.id_modelo)
          .then((response) => {
            SuccessRequestNotification({ notificationText: `Modelo ${instance.original.modelo} removido com sucesso!`})
            updateTable();
          })
          .catch((e) => {
            ErrorRequestNotification({ notificationText: e.response.data.message, timeout: 7000})
            console.log("modelosDTServiceDelete-Error", e.response.data)
          });
        })
      }
    }

    return (
        <>
            <Toolbar className={clsx(classes.root, {
                [classes.highlight]: instances.length > 0,
            })}>
                    <Typography className={classes.title} color="textSecondary" variant="subtitle1" component="div">
                        {instances.length} Modelos Selecionados
                    </Typography>

                    {/* <Tooltip title="Editar">
                        <IconButton onClick={() => setEditModal(!editModal)} >
                            <EditIcon />
                        </IconButton>
                    </Tooltip> */}
                
                    <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete()} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
            </Toolbar>

            {/* {editModal &&
                <ModelosCrudBatch
                    isOpen={editModal}
                    toggleModal={() => setEditModal(!editModal)}
                    instances={instances}
                />
            } */}
        </>
    );
};


const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        fontFamily: 'inherit'
    },
}));
