import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { format } from 'date-fns'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const HoverElement = ({ data, handleHoverElement }) => {
    console.log("data", data)
    return(
        <div className="HoverElement">
            <div style={{ display: 'flex', placeContent: 'flex-end' }}>
                
                <HighlightOffIcon style={{ cursor: 'pointer' }} onClick={(e) => handleHoverElement(e, 'leave')} />
            </div>
            <label>{data.row.original.modelo}</label>
            <h6>{data.row.original.fabricante.fabricante}</h6>
            <Tabs defaultActiveKey="config">
                <Tab eventKey="config" title="Configuração">
                    <div style={{ marginTop: '10px'}}>
                        <p><strong>Processador: </strong>{data.row.original.sockets} x {data.row.original.processador.processador}</p>
                        <p><strong>Clock: </strong>{data.row.original.processador.clock}</p>
                        <p><strong>Memória (GB): </strong>{data.row.original.memoria_gb}</p>
                        <p><strong>Disco (GB): </strong>
                            {data.row.original.qtde_hdd} x {data.row.original.cap_hdd_gb} (HDD) - 
                            {" "}{data.row.original.qtde_ssd} x {data.row.original.cap_ssd_gb} (SSD) - 
                            {" "}{data.row.original.qtde_nvme} x {data.row.original.cap_nvme_gb} (SSD) - 
                            {" "}{data.row.original.totalDiskGB} (Total)
                        </p>
                        <p><strong>Rede: </strong>
                            {data.row.original.type_ethernet_1g} x {data.row.original.int_ethernet_1g} (1Gb/Eth) - 
                            {" "}{data.row.original.type_ethernet_10g} x {data.row.original.int_ethernet_10g} (10Gb/Eth)
                        </p>
                        <p><strong>SAN: </strong>
                            {data.row.original.type_hba} x {data.row.original.cap_hba_gb} (HBA)
                        </p>
                        <p><strong>Tamanho (U): </strong>
                            {data.row.original.tamanho}
                        </p>
                        <p><strong>Firmware: </strong></p>
                        <p><strong>BIOS/UEFI: </strong></p>
                        <p><strong>Serial Number: </strong></p>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}