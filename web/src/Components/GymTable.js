import React, {useState} from 'react';
import { Button, Table, ActionIcon, Container } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import './GymTable.css';


const GymsCard = ({ initdata }) => {
    const [data, setData]=useState(initdata)
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.manager}</Table.Td>
      <Table.Td> <ActionIcon size="xl" color='#86ef2b' onClick={() => handleDelete(item.id)} aria-label="Delete">
          <IconTrash />
        </ActionIcon></Table.Td>
      
    </Table.Tr>
  ));
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));

  };

  return (
    <Container >
    <Table className='table' horizontalSpacing="lg" verticalSpacing="lg"  withTableBorder withColumnBorders withRowBorders >
      <Table.Thead className='head'>
        <Table.Tr>
          <Table.Th>the Gym</Table.Th>
          <Table.Th>Manager of the gym</Table.Th>
          <Table.Th>Remove</Table.Th>
         
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Scroll page to see sticky thead</Table.Caption>
    </Table>
    </Container>
  );
};

export default GymsCard;
