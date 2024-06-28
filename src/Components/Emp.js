import React, {useState} from 'react';
import { Button, Table, ActionIcon, Container } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import './Emp.css';


const Emp = ({ initdata }) => {
    const [data, setData]=useState(initdata)
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.Fname}{item.Lname}</Table.Td>
      <Table.Td>{item.GymName}</Table.Td>
      <Table.Td>{item.Email}</Table.Td>
      <Table.Td>{item.password}</Table.Td>

      <Table.Td> <ActionIcon size="xl" color='#86ef2b' onClick={() => handleDelete(item.id)} aria-label="Delete">
          <IconTrash />
        </ActionIcon></Table.Td>
      
    </Table.Tr>
  ));
  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <Container >
    <Table className='tablee' horizontalSpacing="lg" verticalSpacing="lg"  withTableBorder withColumnBorders withRowBorders >
      <Table.Thead className='head'>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Gym</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Password</Table.Th>

        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
    </Container>
  );
};

export default Emp;
