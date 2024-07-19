// app/API/SignUp

import axios from "axios";
const API_URL = 'http://127.0.0.1:8000'; 


export const signUp = async (data) => {
    try {
      console.log(data)
      const response = await axios.post(`${API_URL}/auth/registration/`, data);
      console.log("send", data)
      return response.data;
    } catch (error) {
      console.error('Error during sign up:', error.response.data);
      throw error.response.data;
      console.log( error.response.data)
    }
  };