import React from 'react';
import { useData } from '../../Context/DataContext';
import './styles.css';


interface ConfigProps {
  memoryProvisioned: number;
  cpuProvisioned: number;
  totalDiskGB: number;
}

interface ItemProps {
  item: {
    id_vm: number;
    ip: number;
    configuracao: ConfigProps;
    selected: boolean;
    hostname: string;
  }
}

export function TableRow({ item }: ItemProps) {
  const { CalcSummary } = useData();

  return (
    <tr>
      <td className='td-service'>
        <input
          type='checkbox'
          className='input-table-row'
          onClick={() => CalcSummary(item.id_vm)}
        />
      </td>

      <td className='td-service'>{item.hostname}</td>
      <td className='td-service'>{item.configuracao.memoryProvisioned} GB</td>
      <td className='td-service'>{item.configuracao.cpuProvisioned} vCPUs</td>
      <td className='td-service'>{item.configuracao.totalDiskGB} GB</td>
      <td className='td-service'>{item.ip}</td>
    </tr>
  );
}
