import React, { useEffect, useState } from 'react'

import { useDataTableModelosContext } from './DataTableModelosContext'

import API, { endpointsCadastro } from '../../../../services/API'

export const SearchField = ({ column }) => {
    const [listFabricante, setListFabricante] = useState(undefined)
    const [listProcessador, setListProcessador] = useState(undefined)

    const { 
        searchInstance,
        onChangeSearchInstance
        } = useDataTableModelosContext()

    useEffect(() => {
        switch(column){
            case 'fabricante.fabricante':
                return requestListFabricante()
            case 'processador.processador':
                return requestListProcessador()
            default:
                return
        }
    }, [])

    const requestListFabricante = () => {
        API.get(endpointsCadastro.FABRICANTE, { params: {
            page: 0,
            per_page: 0
        }}).then((response) => {
            const list = response.data.itens
            setListFabricante(list)
        }).catch((e) => console.log("Error-requestListFabricante", e))
    }

    const requestListProcessador = () => {
        API.get(endpointsCadastro.PROCESSADOR, { params: {
            page: 0,
            per_page: 0
        }}).then((response) => {
            const list = response.data.itens
            setListProcessador(list)
        }).catch((e) => console.log("Error-requestListProcessador", e))
    }


    return(
        <div>
            {column === 'modelo' &&
                <input
                    style={{ width: '150px'}}
                    type="text"
                    placeholder="Digite sua busca..."
                    value={searchInstance.modelo}
                    onChange={(e) => onChangeSearchInstance("modelo", e.target.value)}
                />
            }
            {column === 'fabricante.fabricante' &&
                <select
                    style={{ width: '90px'}}
                    value={searchInstance.fabricante}
                    onChange={(e) => onChangeSearchInstance("fabricante", e.target.value)}
                >   
                    <option key={"allFabricantes"} value={''}>{"Todos"}</option>
                    {listFabricante?.map((fabricante) => (
                        <option key={fabricante.fabricante} value={fabricante.fabricante}>{fabricante.fabricante}</option>
                    ))}
            </select>
            }
            {column === 'processador.processador' &&
                <select
                    style={{ width: '120px'}}
                    value={searchInstance.processador}
                    onChange={(e) => onChangeSearchInstance("processador", e.target.value)}
                >   
                    <option key={"allProcessadores"} value={''}>{"Todos"}</option>
                    {listProcessador?.map((processador) => (
                        <option key={processador.processador} value={processador.processador}>{processador.processador}</option>
                    ))}
            </select>
            }
            {column === 'sockets' &&
                <select
                    value={searchInstance.sockets}
                    onChange={(e) => onChangeSearchInstance("sockets", e.target.value)}
                >   
                    <option key={"allSockets"} value={''}>{"Todos"}</option>
                    {[2,4,6,8].map((sockets) => (
                        <option key={`sockets-${sockets}`} value={sockets}>{sockets}</option>
                    ))}
            </select>
            }
            {column === 'processador.cores' &&
                <input
                    style={{ width: '60px'}}
                    type="text"
                    placeholder="..."
                    value={searchInstance.cores}
                    onChange={(e) => onChangeSearchInstance("cores", e.target.value)}
                />
            }
            {column === 'processador.clock' &&
                <input
                    style={{ width: '60px'}}
                    type="text"
                    placeholder="..."
                    value={searchInstance.clock}
                    onChange={(e) => onChangeSearchInstance("clock", e.target.value)}
                />
            }
        </div>
    )
}