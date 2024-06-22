    import React, { useState } from 'react';
    import {Text, StyleSheet,View,ScrollView} from "react-native"
    import { Button,Snackbar,RadioButton } from 'react-native-paper';
    import CustomTextInput from '@/components/CustomTextInput';
    import { useNavigation } from '@react-navigation/native';
    import { Stack, router } from 'expo-router';


    const SignUp: React.FC =()=>{

        const [email, setEmail]= useState("");
        const [password, setPassword] = useState("");
        const [fName, setFName] =useState("");
        const [Lname, setLName]= useState("");
        const [age, setAge] = useState<number | null>(null);
        const [weight, setWeight] = useState<number | null>(null);
        const [height, setHeight] = useState<number | null>(null);
        const [gender, setGender]= useState <string>("");
        const [visible, setVisible] = useState(false);
        const [errorMessage, setErrorMessage]= useState('');
        const onToggleSnackBar = () => setVisible(!visible);
        const onDismissSnackBar = () => setVisible(false);

        const handleSign = () => {
            if (fName.trim() === '' || Lname.trim() === '') {
                setErrorMessage("full name can't be empty, please fill them.");
                onToggleSnackBar();
            }
            else if (email.trim() === '' || password.trim() === '') {
                setErrorMessage('Email and password cannot be empty.');
                onToggleSnackBar();
            } else if( age == null || age <= 0)
            {
               setErrorMessage('Age must be Upper than 0.');
               onToggleSnackBar();
            } else if(weight !==null && weight <= 0)
            {
               setErrorMessage('Weight must be a positive number if provided.');
               onToggleSnackBar();
            }else{
                router.push('/Login');
            }
        }


        return(
            
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
               <Text style={styles.title} >Create your {'\n'} Account!</Text>
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
                 label="age"
                 value={age ? age.toString() : ''}
                 onChangeText={(text) => setAge(Number(text))}
                 autoFocus
                  />
                   <CustomTextInput
                 label="Height"
                 value={height ? height.toString() : ''}
                 onChangeText={(text) => setHeight(Number(text))}
                 autoFocus
                  />
                     <CustomTextInput
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
            <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender} >
              <View style={styles.radioContainer}>
                <RadioButton  color="#a9f368" value="male" />
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
                backgroundColor:'#a9f368' 

              },


        })
    
    export default SignUp;