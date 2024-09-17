import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Modal, Button, TextInput as RNTextInput , Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateGroup } from '../app/API/CoachAPI';
import { useAuth } from '../app/AuthContext';

const CreateGroupModal = ({ visible, onDismiss, onSubmit }) => {
  const { authState } = useAuth();
  const [startHour, setStartHour] = useState(new Date());
  const [sessionLength, setSessionLength] = useState('');
  const [groupCapacity, setGroupCapacity] = useState('');
  const [daysOff, setDaysOff] = useState({});
  const [showPicker, setShowPicker] = useState(false);

  console.log("gymId", authState.gymId)

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startHour;
    setShowPicker(false);
    setStartHour(currentTime);
  };

  const dayMapping = {
    1: 'sunday',
    2: 'monday',
    3: 'tuesday',
    4: 'wednesday',
    5: 'thursday',
    6: 'friday',
    7: 'saturday',
  };

  const handleCheckboxChange = (day) => {
    setDaysOff((prevDaysOff) => ({
      ...prevDaysOff,
      [day]: prevDaysOff[day] ? null : dayMapping[day],
    }));
  };

  const handleSubmit = async () => {
    const data = {
      gym: authState.gymId,
      start_hour: startHour.toTimeString().slice(0, 5) + ":00",
      session_length: parseInt(sessionLength, 10),
      group_capacity: parseInt(groupCapacity, 10),
      days_off: Object.keys(daysOff).reduce((acc, day) => {
        if (daysOff[day]) acc[day] = daysOff[day];
        return acc;
      }, {}),
    };
  
    console.log("Data to be submitted:", data);

    try {
      console.log("submit new group", JSON.stringify(data));
      const response = await CreateGroup(data, authState.accessToken);
      console.log("res of create group", response.data);
      onSubmit(response.data);
      // onDismiss();
      alert("Created successfully:" +JSON.stringify(response.data)); 
    } catch (error) {
      // Improved error handling logic
      if (error.response) {
        // Server responded with a status code out of 2xx
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        alert("Error: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        // Request was made but no response received
        console.log('Request data:', error.request);
        alert('No response received from server.');
      } else {
        // Error in setting up the request
        console.log('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
      console.log('Error config:', error.config);
    }
  
  }
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
      <ScrollView>
        <Button mode="outlined" textColor='#a1E533' onPress={() => setShowPicker(true)} style={styles.timeButton}>
          Select Start Hour
        </Button>
        <Text style={styles.label}>
          Selected Time: {startHour.toTimeString().slice(0, 5)}
        </Text>

        {showPicker && (
          <DateTimePicker
            value={startHour}
            mode="time"
            is24Hour={true}
            minuteInterval={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <RNTextInput
          label="Session Length (minutes)"
          value={sessionLength}
          onChangeText={setSessionLength}
          keyboardType="numeric"
          style={styles.input}
          theme={{
            colors: {
              primary: 'lime', // the outline color when focused
              text: '#fff', // Set the text color
              placeholder: '#aa5', // Placeholder color
            },
          }}
        />
        <RNTextInput
          label="Group Capacity"
          value={groupCapacity}
          onChangeText={setGroupCapacity}
          keyboardType="numeric"
          style={[styles.input]} 
           theme={{
            colors: {
              primary: 'lime', // the outline color when focused
              text: '#fff', // Set the text color
              placeholder: '#aa5', // Placeholder color
            },
          }}
        />

        <View>
          <Text style={styles.title}>Days off</Text>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
            <Checkbox.Item
              key={index}
              label={day}
              status={daysOff[index + 1] ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange(index + 1)}
              color='lime'
              labelStyle={styles.checkboxLabel} 
              style={styles.label}
            />
          ))}
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Create Group
        </Button>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    marginTop: 10,
  },
  timeButton: {
    marginBottom: 10,
    backgroundColor: '#292929',
    borderColor: '#a1E533',
  
  },
  button: {
    marginTop: 10,
    backgroundColor: '#a1E533',
    color: '#fff',
  },
  checkboxLabel: {
    color: '#fff', 
  },
  label: {
    color: '#fff',
  },
  title:{
    color:'#fff',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',

  }
});

export default CreateGroupModal;
