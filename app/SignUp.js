  import React, { useState } from 'react';
  import {Text, StyleSheet,View,ScrollView} from "react-native"
  import { Button,Snackbar,RadioButton } from 'react-native-paper';
  import CustomTextInput from '../components/CustomTextInput';
  import { useNavigation } from '@react-navigation/native';
  import { Stack, router } from 'expo-router';
  import CustomNumberInput from '../components/CustomNumberInput';
  import {signUp}from './API/Log/Sign';
  import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';



  const SignUp =()=>{

      const [email, setEmail]= useState("");
      const [password, setPassword] = useState("");
      const [fName, setFName] =useState("");
      const [Lname, setLName]= useState("");
      const [username, setUsername]= useState("");
      const [address, setAddress] =useState("");
      const [birthDate, setBirthDate] = useState('');

      const [weight, setWeight] = useState();
      const [height, setHeight] = useState();
      const [gender, setGender]= useState ("");
      const [visible, setVisible] = useState(false);
      const [errorMessage, setErrorMessage]= useState('');
      const [showDatePicker, setShowDatePicker] = useState(false);

      const onToggleSnackBar = () => setVisible(!visible);
      const onDismissSnackBar = () => setVisible(false);
      
      const handleValueChange = (value) => {
        const genderValue = value === 'male' ? 0 : 1;
        setGender(genderValue);
      };

      const handleSign = async () => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(birthDate)) {
          setErrorMessage('Birth date must be in the format YYYY-MM-DD.');
         onToggleSnackBar();
          return;
         }
          if (fName.trim() === '' || Lname.trim() === '' ||username.trim() === '') {
              setErrorMessage("full name can't be empty, please fill them.");
              onToggleSnackBar();
          }
          else if (email.trim() === '' || password.trim() === '') {
              setErrorMessage('Email and password cannot be empty.');
              onToggleSnackBar();
           
          } else if(weight !==null && weight <= 0)
          {
            setErrorMessage('Weight must be a positive number if provided.');
            onToggleSnackBar();
          }  else if(height !==null && height <= 0)
          {
            setErrorMessage('Weight must be a positive number if provided.');
            onToggleSnackBar();
          } else {
            try {
              const data = {
                user_profile: {
                  username,
                  email,
                  gender,
                  password,
                  password2: password,
                  birth_date: birthDate,
                  
                },
                address: address,
                height,
              };
      
              await signUp(data);
              router.push('/Login');
            } catch (error) {
              setErrorMessage('Sign up failed. Please try again.');
              onToggleSnackBar();
            }
          }
        };
      

 


      return(
          
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title} >Create your {'\n'} Account!</Text>
            <CustomTextInput
              label="Username"
              value={username}
              onChangeText={(e) => setUsername(e)}
              autoFocus
                />
              <CustomTextInput
              label="First name"
              value={fName}
              onChangeText={(e) => setFName(e)}
              autoFocus
                />

              <CustomTextInput
              label="Last name"
              value={Lname}
              onChangeText={(e) => setLName(e)}
              autoFocus
                />
           <CustomTextInput
            label="Birthday (YYYY-MM-DD)"
            type="date"
            value={birthDate}
             onChangeText={setBirthDate} 
             autoFocus />

    <CustomTextInput
    label="Address"
    type=''
    placeholder="damascus,Rawda"
    value={address}
    onChangeText={(e) => setAddress(e)}
    required
  />
    <CustomNumberInput
      label="Height"
      value={height ? height.toString() : ''}
      onChangeText={(text) => setHeight(Number(text))}
      autoFocus
    />
    <CustomNumberInput
      label="Weight"
      value={weight ? weight.toString() : ''}
      onChangeText={(text) => setWeight(Number(text))}
      autoFocus
    />
              <CustomTextInput
      label="Email"
      value={email}
      onChangeText={(e) => setEmail(e)}
      autoFocus
    />

    <CustomTextInput
      label="Password"
      value={password}
      onChangeText={(e) => setPassword(e)}
      secureTextEntry
    />
      <Text style={styles.label}>Gender</Text>
        <RadioButton.Group onValueChange={handleValueChange} value={gender === 0 ? 'male' : 'female'}>
          <View style={styles.radioContainer}>
            <RadioButton color="#a9f368" value="male" />
            <Text style={styles.radioLabel}>Male</Text>
          </View>
          <View style={styles.radioContainer}>
            <RadioButton color="#a9f368" value="female" />
            <Text style={styles.radioLabel}>Female</Text>
          </View>
        </RadioButton.Group>
          <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={Snackbar.DURATION_SHORT}
          action={{
          label: 'Close',
          onPress: onDismissSnackBar,
          color: '#fff',
          }}
      >
          <View style={styles.snackbarContent}>
          <Text style={{ color: '#fff' }}>{errorMessage}</Text>
          </View>
      </Snackbar>
      <Button  style={styles.btn} mode="contained"  onPress={handleSign}
      >
      Submit
    </Button>
    </ScrollView>
      );
  };
      
      const styles= StyleSheet.create({
          scrollViewContent: {
              flexGrow: 1,
              backgroundColor: '#1a1a1a',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
              paddingBottom: 50,
            },
          

            
            title:{
                fontSize:30,
                fontWeight: "bold",
                color:"#fff",
                marginBottom:10,
                marginTop:15,
                alignSelf:"flex-start",
            },
          snackbarContent: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            label: {
              alignSelf:"flex-start",
              marginVertical: 8,
              fontSize: 16,
              fontWeight: 'bold',
              color:"#fff"
            },
            radioContainer: {
              flexDirection: 'row',
              alignItems: 'center',
              
            },
            radioLabel: {
              color:"#fff",
            },
            btn:{
              marginTop:10,
              width:"90%",
              marginBottom:20,
              backgroundColor:'#a1E533' 

            },


      })

  export default SignUp;