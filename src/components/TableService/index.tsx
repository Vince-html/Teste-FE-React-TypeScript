import React from 'react';
import { DataJsonProps, useData } from '../../Context/DataContext';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import './styles.css';

export function TableService() {
  const { dataJson } = useData();

  return (
    <TableHeader title='Tabela de servidores'>
      <table className='table-service'>
        <thead>
          <tr className='main-summary'>
            <th className='th-service'>Select</th>
            <th className='th-service'>Hostname</th>
            <th className='th-service'>Memória</th>
            <th className='th-service'>vCPUs</th>
            <th className='th-service'>Disco</th>
            <th className='th-service'>IP</th>
          </tr>
        </thead>
        <tbody className='tb-service'>
          {dataJson &&
            dataJson.map((item: DataJsonProps) => <TableRow key={item.id_vm} item={item} />)}
        </tbody>
      </table>
    </TableHeader>
  );
}
