import React from 'react';
import { Button, Flex, MantineProvider, Title } from '@mantine/core';
import { AppShell,Burger } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import MainAdminP from './interfaces/MainAdminP';
import Login from '../src/interfaces/Login';
import Buttons from './Components/Buttons';
import GymInterface from './interfaces/GymInterface';
import '@mantine/core/styles.css'; 
import './App.css';
import Managerinterface from './interfaces/ManagerInterface';
import EmpTable from './interfaces/EmpTable';
import Test from './interfaces/Test';
import Logo from './Components/Logo';
import Header from './Components/Header';
import { Nav } from './Components/Nav';
import EmpMainP from './interfaces/Employee/EmpMainP';

function App() {
  // const location = useLocation();

  // //  paths for employee interfaces
  // const employeePaths = ['/EmpMainP'];

  // // Check if the current path is one of the employee paths
  // const showNavbar = employeePaths.includes(location.pathname);

  return (
    <MantineProvider
    theme={{
      colorScheme: 'dark',
      colors: {
        dark: ['#211F1F', '#a1E533'],
      },
      globalStyles: (theme) => ({
        body: {
          backgroundColor: theme.colors.dark[0],
          color: theme.colors.dark[1],
        },
      }),
    }}>
      
    <Router>
    <AppShell
    header={{height:80}}
    navbar={{width:300, breakpoint:'lg' }}
    padding="md">

  
      <AppShell.Header>
        <Flex justify="space-between" align='center' className='header'>
          <Logo/>
          <Title>FitZone</Title>
        </Flex>
      </AppShell.Header>

      {/* {showNavbar && ( */}
          <AppShell.Navbar p='md' className='nav'>
     <Nav/>
      </AppShell.Navbar>
      {/* )} */}

      <AppShell.Main>
      
        <Routes>
        <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/" element={<MainAdminP />} />
          <Route path='/GymInterface' element={<GymInterface />} />

          {/* Manager */}
          <Route path='/ManagerInterface' element={<Managerinterface/>}/>
          <Route path='/EmpTable' element={<EmpTable/>}/>
          
          <Route path='/Test' element={<Test/>}/>
          
          {/* Employee */}
          <Route path='/EmpMainP' element={<EmpMainP />} />

        </Routes>
      </AppShell.Main>
      
   
    </AppShell>
    </Router>
    </MantineProvider>
  );
}

export default App;
