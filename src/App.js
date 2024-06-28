import React from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainAdminP from './interfaces/MainAdminP';
import Login from '../src/interfaces/Login';
import GymInterface from './interfaces/GymInterface';
import '@mantine/core/styles.css'; 
import './App.css';
import Managerinterface from './interfaces/ManagerInterface';
import EmpTable from './interfaces/EmpTable';
import Test from './interfaces/Test';

function App() {
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
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainAdminP />} />
          <Route path="/login" element={<Login />} />
          <Route path='/GymInterface' element={<GymInterface />} />
          <Route path='/ManagerInterface' element={<Managerinterface/>}/>
          <Route path='/EmpTable' element={<EmpTable/>}/>
          
          <Route path='/Test' element={<Test/>}/>
          
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
