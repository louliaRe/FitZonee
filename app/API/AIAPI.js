import axios from 'axios';

const API_URL = 'http://192.168.43.228:8000'|| 'http://192.168.1.106:8000';  


export const dietDetails = async (accessToken, data)=>{
    console.log('dietDetails', data);
    try{
    const response = await axios.post(`${API_URL}/diet_helper/`, data, {
     headers:{
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
 }});
 console.log('dietDetails inside api ', response.data);
 return response.data;
}catch (e){
    console.error('Error in dietDetails', e.response.data.error);
    throw e.response.data.error;
}
}