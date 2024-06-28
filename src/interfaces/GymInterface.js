import React, {useState} from "react";
import { Table, Container, Modal, Button, TextInput, PasswordInput, InputWrapper } from "@mantine/core";
import GymsTable from '../Components/GymTable';
import Layout from "../LayoutA";
import './GymInterface.css'


const GymInterface=()=>{
    // const[gyms, setGyms]= useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newGym, setNewGym] = useState({ name: '', manager: '', password:'' });

    // useEffect(() => {
    //     axios.get('api') 
    //       .then(response => {
    //         setGyms(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    //   }, []);

    const gyms = [
        { name: 'Fitness Club', manager: 'fadi123@gmail.com' },
        { name: 'Malki Gym', manager: 'manager123@gmail.com' },
        { name: 'Moualla', manager: 'Mary123@gmail.com' },  
             ];

             const handleAddGym = (gym) => {
                // setGyms([...gyms, gym]);
                setModalOpen(false);
            };
        
            const handleModalToggle = () => {
                setModalOpen(!modalOpen);
            };
        
            const handleChange = (e) => {
                setNewGym({...newGym, [e.target.name]: e.target.value });
            };
        
            const handleSearch = (event) => {
                //  logic 
                console.log(event.target.value);
              };
         
    
      return (
        <Layout>
        <Container>
            <div className="TB">
                <h1 style={{ color: '#fff' }}>Gyms Table</h1>
                <input
                 type="text"
                 placeholder="Search..."
        
                 onChange={handleSearch}
                className="search"
                 style={{ marginRight: '10px', padding: '5px', fontSize: '16px' }}
      />
                <Button onClick={handleModalToggle} color="#a1E533" >Add a New Gym</Button>
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Modal opened={modalOpen} onClose={handleModalToggle} fullScreen title='New Gym'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddGym(newGym);
                        setNewGym({ name: '', manager: '',password:'' }); // Reset form
                    }}>
                        <InputWrapper label="Gym Name">
                        <TextInput
                         type="text"
                         name="name"  
                        value={newGym.name}
                        onChange={handleChange}
                        placeholder="Gym Name"
                        required />
                        </InputWrapper>

                        <TextInput
                        type="email" 
                        name="manager"
                        label='Manager Email' 
                        value={newGym.manager} 
                        onChange={handleChange} 
                        placeholder="Manager Email" 
                        required />

                        <PasswordInput
                        label='Manager Password' 
                        type="password"
                        name="password"
                        value={newGym.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        />

                        <Button type="submit" color="#a1E533" className="submit">Add Gym</Button>
                    </form>
                </Modal>
                </div>
        <GymsTable initdata={gyms} />
      </Container>
      </Layout>
      )
}
export default GymInterface;