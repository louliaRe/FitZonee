import React from "react";
import AddEmp from "../Components/AddEmp";
import AdminStatistics from "../Components/AdminStatistics";
import {Container, Button} from '@mantine/core';
import Layout from "../LayoutA";
import './MainAdminP.css'



const Managerinterface=()=>{
    return (
        <Layout> 
            <Container  className="container">
           <div className="c">
       <AdminStatistics />
     </div>
     <div className="c">
    <AddEmp/>
        </div>
      </Container>
     
      </Layout>
     )

}
export default Managerinterface;