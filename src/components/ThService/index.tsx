import React from 'react';
import { BiUpArrow } from 'react-icons/bi';
import { useData } from '../../Context/DataContext';
import './styles.css';

export default function ThService({ item }) {
  const { OrderColumnService } = useData();

  return (
    <th className='th-service'>
      {item.title}{' '}
      {item.title === 'Select' || item.title === 'IP' ? (
        ''
      ) : (
        <BiUpArrow
          className='arrow-up'
          onClick={() => {
            OrderColumnService(item.type);
          }}
        />
      )}
    </th>
  );
}
