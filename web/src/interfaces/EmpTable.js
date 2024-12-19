import React, { useState } from "react";
import Emp from "../Components/Emp";
import { Button, Container, Modal, TextInput, PasswordInput } from "@mantine/core";
import './EmpTable.css';
import Layout from "../LayoutA";
import { useDisclosure } from '@mantine/hooks';


const EmpTable = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newEmp, setNewEmp] = useState({ Fname: '', Lname: '', Email: '', GymName: '', password: '' });
  const [emps, setEmps] = useState([
    { id: 1, Fname: 'emp1', Lname: 'em', GymName: 'Malki Gym', Email: 'emp1@gmail.com', password: '123456' },
    { id: 2, Fname: 'emp2', Lname: 'em', GymName: 'Malki Gym', Email: 'emp2@gmail.com', password: '123456' },
    { id: 3, Fname: 'emp3', Lname: 'em', GymName: 'Malki Gym', Email: 'emp3@gmail.com', password: '123456' },
  ]);

  const handleAddEmp = (emp) => {
    setEmps([...emps, { ...emp, id: emps.length + 1 }]);
  };

    // const handleModalToggle = () => {
    //   console.log(`Toggling modal: ${modalOpen}`);
    //   setModalOpen(!modalOpen);
    // };

  const handleChange = (e) => {
    setNewEmp({ ...newEmp, [e.target.name]: e.target.value });
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    // Implement search logic here
  };

  return (
      <Container>
        <div className="TB">
          <h1 style={{ color: '#fff' }}>Employees</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="search"
            style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
          />
          <Button onClick={open} color="#a1E533">Add a New Employee</Button>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Modal opened={opened} onClose={close} fullScreen  title="New Employee">  
             <form onSubmit={(e) => {
            e.preventDefault();
            handleAddEmp(newEmp);
            setNewEmp({ Fname: '', Lname: '', GymName: '', Email: '', password: '' }); // Reset form
          }}>
            <TextInput
              label="First Name"
              type="text"
              name="Fname"
              value={newEmp.Fname}
              onChange={handleChange}
              placeholder="John"
              required
            />
            <TextInput
              label="Last Name"
              type="text"
              name="Lname"
              value={newEmp.Lname}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
            <TextInput
              type="email"
              name="Email"
              label='Email'
              value={newEmp.Email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
            <PasswordInput
              label='Password'
              type="password"
              name="password"
              value={newEmp.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Button type="submit" color="#a1E533" className="submit">Add Employee</Button>
          </form>
        </Modal>
        </div>
        <Emp initdata={emps} />
      </Container>
  );
};

export default EmpTable;
