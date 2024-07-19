import React,{useState, useEffect} from "react";
import {  useForm, isNotEmpty, isEmail, isInRange, hasLength, matches} from "@mantine/form";
import { Button, PasswordInput, TextInput } from "@mantine/core";



const Login=()=>{
    const [email,setEmail]=useState('');
    const [password, setPassword]= useState('');

    cons

    const handleLogin= useForm({
        validate:{
            email: isEmail('Invalid email'),
            password:hasLength({min:2})
        }
    })
        // if(!email||!password){
        //     if(!email){

        //     }
        
    


    return(
        <form>
        <TextInput 
        label='Email'
        placeholder="your_mail@gmail.com"
        value={email}
        onChange={()=>setEmail(value)}
        />
       <PasswordInput
       label='Passowrd'
       placeholder="****"
       value={password}
       onChange={()=>setPassword(password)}
            />

            <Button onClick={handleLogin()}>
                Login
            </Button>
            </form>
    )
}
export default Login;