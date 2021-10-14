import { useData } from '../../Context/DataContext';
import { TableHeader } from '../TableHeader';
import './styles.css';

export function Summary() {
  const { summaryData } = useData();

  return (
    <TableHeader title='Sumário dos recursos dos servidores'>
      <table className='table-summary'>
        <tbody>
          <tr className='tr-summary'>
            <th className='th-summary -first'>Servidores Selecionados</th>
            <td className='td-summary'>
              {summaryData.data.quantity} servidores selecionados
            </td>
          </tr>
          <tr className='tr-summary'>
            <th className='th-summary'>Total de Memória</th>
            <td className='td-summary'>{summaryData.data.memory} GB</td>
          </tr>
          <tr className='tr-summary'>
            <th className='th-summary'>Total de CPUs</th>
            <td className='td-summary'>{summaryData.data.vcpus} vCPUs</td>
          </tr>
          <tr className='tr-summary'>
            <th className='th-summary -last'>Total de Discos</th>
            <td className='td-summary -last'>{summaryData.data.disk} GB</td>
          </tr>
        </tbody>
      </table>
    </TableHeader>
  );
}
