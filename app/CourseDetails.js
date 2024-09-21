import React,{useState} from 'react';
import { View, Text, StyleSheet, Button, ImageBackground ,ScrollView} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {registerClasses} from './API/ClientAPI';
import {useAuth} from './AuthContext'

const CourseDetails = () => {
  const {authState}= useAuth();
  const [vouchers, setVouchers] = useState([]);
  const router = useRouter();
  const { course } = useLocalSearchParams(); // Get course data from params
  const courseDetails = JSON.parse(course);  // Parse course data

  const handleRegister = async() => {
    const scheduleId = courseDetails.schedule[0].class_scheduel_id; 
    console.log(`Registering for ${courseDetails.name} with schedule ID: ${scheduleId}`);
   try{
    const data= {
      vouchers: vouchers,
      class_schedule_id: scheduleId,
    
    }
    const res= await registerClasses(authState.accessToken,data);
    console.log('res register', res);
    alert(res)
   }catch(e){
    console.log("error registering",e); 
    if (e= `[Error: [ErrorDetail(string="['this client is registered in a class that overlaps with this class']", code='invalid')]]`){
      alert(" You already registered in this class!")
    }else{
      alert("An error occurred while registering!, Check you account please <3" )
    }
    
   }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: courseDetails.image_path }}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay} />
        <Text style={styles.courseName}>{courseDetails.name}</Text>
        <Text style={styles.coach}>Coach: {courseDetails.schedule[0].trainer.employee.user.username}</Text>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Cost: ${courseDetails.registration_fee}</Text>
        <Text style={styles.infoText}>Start Time: {courseDetails.schedule[0].start_time}</Text>
        <Text style={styles.infoText}>End Time: {courseDetails.schedule[0].end_time}</Text>
        <Text style={styles.infoText}>Start Date: {courseDetails.schedule[0].start_date}</Text>
        <Text style={styles.infoText}>End Date: {courseDetails.schedule[0].end_date}</Text>
        <Text style={styles.infoText}>Hall: {courseDetails.schedule[0].hall}</Text>
        <Text style={styles.infoText}>Number of trainees allowed: {courseDetails.schedule[0].allowed_number_for_class}</Text>
        <Text style={styles.infoText}>Number of trainees till now: {courseDetails.schedule[0].current_number_of_trainees}</Text>
        <Text style={styles.infoText}>Cancel allowed duration: {courseDetails.schedule[0].allowed_days_to_cancel}</Text>


{/* current_number_of_trainees */}
        <TextInput
          style={styles.voucherInput}
          placeholder="Voucher Code"
          value={vouchers}
          onChangeText={setVouchers}
        />
        
        <Button title="Register Now" onPress={handleRegister} color="#8ee53f" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 20,
  },
  backgroundImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
  },
  courseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a1E533',
  },
  coach: {
    fontSize: 18,
    color: '#ccc',
    marginTop: 5,
  },
  parts:{
    color:'#a1E533',
    fontWeight:'bold'
  },
  infoContainer: {
    backgroundColor: '#444',
    padding: 20,
    borderRadius: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseDetails;
