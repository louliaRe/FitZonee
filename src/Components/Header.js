import cx from "clsx";
import { useState } from "react";
import {
    Avatar,
    Text,
    useMantineTheme,
    Title,
} from "@mantine/core";
import { Button } from '@mantine/core';
import classes from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import Logo from "./Logo";

const Header = () => {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    
  

    const handleLogout = () => {
      
        navigate("/login");
        window.location.reload();
    };
   

    return (
        <div className={classes.header}>
            <Logo/>
            <Title className="title">
               FitZone
            </Title>

            <div className={classes.AT}>
           <Avatar size={"md"} color="#fff" />
           <Text className={classes.username} >Loulia</Text>
           <Button className={classes.Button} onClick={handleLogout} size="compact-md">
            logout  
           </Button>
           </div>         
          
        </div>
 
);
};
export default Header;
