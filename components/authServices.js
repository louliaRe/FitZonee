import axios from 'axios';

export const loginUser = async (username,Email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
            username,
            password,
            email:Email,
        }); 
        console.log("Send data:", username,password )
        console.log('Response Data:', response.data); // Debugging

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data.error); 
            throw new Error( error.response.data.error || 'Login failed');
        } else if (error.request) {
            console.error('Error Request:', error.request); 
            throw new Error('No response from server');
        } else {
            console.error('Error:', error.message); 
            throw new Error('An error occurred while logging in');
        }
    }
};
