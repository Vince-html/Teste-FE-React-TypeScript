
import React from 'react';
import './styles.css';

interface TableHeaderProps {
  children: React.ReactNode;
  title: string;
}

export function TableHeader({ children, title }: TableHeaderProps) {
  return (
    <main className='main-summary'>
      <h1 className='header-summary'>{title}</h1>
      {children}
    </main>
  );
}
