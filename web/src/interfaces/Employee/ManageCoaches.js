import React,{useState, useEffect, useContext} from "react";
import CoachesTable from "../../Components/Employee/CoachesTable";
import { useDisclosure } from '@mantine/hooks';
import { Button ,Modal,Container ,TextInput, PasswordInput, Select, MultiSelect} from "@mantine/core";
import classes from './ManageCoaches.module.css';
import { DateInput } from "@mantine/dates";
import {addCoach, getCoaches} from '../../ApiServices/EmpServices';
import moment from "moment";
import {useAuth} from '../../AuthContext';

const ManageCoaches=()=>{

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedGym, setSelectedGym] = useState('');
    const [search, setSearch] = useState('');
    const [newCoach, setNewCoach] = useState({username: '', Email: '', password: '', Description:'', days_off:[],shift:'',birth_date:'', start_date:''});
    const [coaches, setCoaches] = useState([]);
    const [errors, setErrors] = useState({});
    
    const { authState } = useAuth();
        console.log("AuthState in ManageCoaches:", authState);


    useEffect(() => {
      const fetchCoaches = async () => {
          try {
              const data = await getCoaches(authState.accessToken);
              setCoaches(data);
              console.log("get",data )

          } catch (error) {
              console.error("Error fetching coaches:", error.message);
          }
      };

      
          fetchCoaches();
      
  }, [authState]);

  console.log("coaches", coaches)
    const handleAddEmp = async (coach) => {
        try {
          const start= moment(coach.start_date).format("YYYY-MM-DD");

          const formatDate = moment(coach.birthday).format("YYYY-MM-DD");

           console.log("date")
            const data = {
                user: {
                    username: coach.username,
                    password: coach.password,
                    password2: coach.password,
                    email: coach.Email,
                    birth_date: formatDate ,
                },
                shift: {
                    days_off: {
                        day1: coach.days_off[0],
                        day2: coach.days_off[1]
                    },
                    shift_type: coach.shift
                },
                start_date: start
            };
            console.log("coach:", data)
            const addedCoach = await addCoach(data,authState.accessToken);
            setCoaches([...coaches, { ...addedCoach, id: coaches.length + 1 }]);
            close();
        } catch (error) {
            console.error('Error adding coach:', error.message);
            setErrors({ submit: error.message });
        }
    };

   
    
    
      const handleChange = (e) => {
        setNewCoach({ ...newCoach, [e.target.name]: e.target.value });
      };
    
      const handleSearch = (event) => {
        console.log(event.target.value);
      };
     

      
    return(
        <Container>
        <div className="TB">

          <h1 style={{ color: '#fff' }}>Coaches</h1>


          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className={classes.search}
            style={{ padding: '5px', fontSize: '16px' }}
          />
         
          <Button onClick={open} color="#a1E533" size="sm" className={classes.btn}>New Coach</Button>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <Modal opened={opened} onClose={close} centered  title="New Coach">  
             <form onSubmit={(e) => {
            e.preventDefault();
            handleAddEmp(newCoach);
            setNewCoach({ username: '', Email: '', password: '', Description:'', days_off:[],shift:'',birth_date:'', start_date:'' }); // Reset form
          }}>
            <TextInput
              label="Username"
              type="text"
              name="username"
              value={newCoach.username}
              onChange={handleChange}
              placeholder="Mark"
              required
            equired
            />
           
            <TextInput
              type="email"
              name="Email"
              label='Email'
              value={newCoach.Email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
            <PasswordInput
              label='Password'
              type="password"
              name="password"
              value={newCoach.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          <DateInput
               label='BirthDay'
               value={newCoach.birthday}
               onChange={(e) => handleChange({ target: { name: 'birthday', value: e } })}
               error={errors.birthday} 
               required
              />
  
              <DateInput
               label='Start Date'
               value={newCoach.start_date}
               onChange={(e) => handleChange({ target: { name: 'start_date', value: e } })}
               error={errors.start_date} 
               required
              />

              <MultiSelect
               label="Days Off"
               name='days_off'

               onChange={(value) => setNewCoach({ ...newCoach, days_off: value })}
               data={['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']}

                            required
                            multiple
                        />
               <Select
              label="Shift"
              name="shift"
              onChange={(value) => setNewCoach({ ...newCoach, shift: value })}
              data={['morning', 'night']}
              placeholder="Morning/Night"
              required
            />

  
            <Button type="submit" color="#a1E533" className={classes.submit}>Add Coach</Button>
          </form>
        </Modal>
        </div>
        <CoachesTable initdata={coaches}/>
      </Container>
    )

}
export default ManageCoaches;