import React, { useState, useEffect, useRef,useMemo } from 'react';
import { ScrollView,View,  Text,Image,StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { Button, IconButton ,Card } from 'react-native-paper';
import { useAuth } from './AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useLocalSearchParams, useRouter } from 'expo-router';


const SessionScreen = () => {
  const router= useRouter();
  const { authState } = useAuth();
  const { info } = useLocalSearchParams();
  const im = 'http://192.168.43.228:8000';

  const parsedInfo = info ? JSON.parse(info) : {};

  const [workout, setWorkout] = useState(parsedInfo);
  const [noWorkout, setNoWorkout] = useState(false);
  const [equipmentStatus,setEquipmentStatus]= useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isFirstExercise, setIsFirstExercise] = useState(true);
  const [equDetails, setEquDetails]= useState({});
  const ws = useRef(null);

  const socketUrl = useMemo(() => {
    return parsedInfo.workout_id
      ? `ws://192.168.43.228:8000/websocket/gym/${authState.branch_id}/${parsedInfo.workout_id}/`
      : `ws://192.168.43.228:8000/websocket/gym/${authState.branch_id}/`;
  }, [parsedInfo.workout_id, authState.branch_id]);

  useEffect(() => {
    if (parsedInfo) {
      setWorkout((prevWorkout) => {
        return JSON.stringify(prevWorkout) !== JSON.stringify(parsedInfo) ? parsedInfo : prevWorkout;
      });
    } else if (parsedInfo?.success) {
      setNoWorkout(true);
    }
  }, [parsedInfo]);

  useEffect(() => {
    if (!socketUrl) return;

    ws.current = new WebSocket(socketUrl, [], {
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    });

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      console.log("mmmmmmmmmmmmmmmmmmmmmmmmm")
      try {
        const message = JSON.parse(event.data);
        // const msg =JSON.parse(event)
        console.log('Received message:', message);
        if(event.limited_exercises){
          alert("you can't do this exercise , it will heart you! ")
        }
        console.log('Received message limited_exercises:', message.limited_exercises);

        // if (msg.event.status){
        // const status=msg.event.status
        // console.log("ssttaattuuss:", status);
        //   setEquipmentStatus(status);
        // }
        if(message?.error){
          Alert.alert('Error', message.error);
        }

        if (message?.exercise) {
          setCurrentExercise(message.exercise);
          setIsFirstExercise(false);
        }
        console.log('current exercise:', currentExercise)
        
        if (message?.tracked_equipments) {
          message.tracked_equipments.forEach((trackedEquipment) => {
            console.log('Tracked Equipment:', trackedEquipment);
            console.log('Tracked Equipment status:', trackedEquipment.status);

            if (trackedEquipment.equipment_details) {
              console.log('Equipment Details:', trackedEquipment.equipment_details);
              setEquDetails(trackedEquipment.equipment_details)
              console.log('Equipment Details Cat:', trackedEquipment.equipment_details.category);
              console.log("trackedEquipment.equipment_details.exercise: ",trackedEquipment.equipment_details.exercise)
            } else {
              console.warn('Equipment details not found in tracked equipment.');
            }
          });
        }
        //limited_exercises
    
        // if (message?.event) {
        //   const status = message.event.status;
        //   if (status === 'unavailable') {
        //     Alert.alert('Equipment Unavailable', 'The machine is not available now');
        //   }
          
        // }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
        console.error("error", )
        Alert.alert('Error', 'Failed to process WebSocket message');
      }
    };
   
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      Alert.alert('WebSocket Error', error.message);
    };

    // Cleanup to close socket
    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('WebSocket connection closed.');
      }
    };
  }, [socketUrl, authState.accessToken]);

  const sendEvent = (event) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(event));
      console.log('Sent event:', event);
    }
  };
    
    const handleStartExercise = () => {
      if (currentExercise && equDetails) {
        // Ensure you have equipment_type and other details from `currentExercise`
        // Replace the following line with actual logic to determine equipment type and equipment ID
        const equipmentType = equDetails.category || 'Unknown';
        const equipmentId = currentExercise?.equipment || 'Unknown';
    
        const event = {
          type: 'equipment_in_use',
          equipment: equipmentId,
          equipment_type:equipmentType,
        };
        console.log("send in use event:",event);
        sendEvent(event);
      }
    };

  

  const handleFinishExercise = () => {
    const event = {
      type: 'finish_exercise',
      equipment: currentExercise?.equipment,
    };
    console.log(event);
    sendEvent(event);
  };

  const handleTrackNextExercise = () => {
    const event = {
      type: 'track',
      next: true,
      previous: false,
    };
    sendEvent(event);
  };

  const handleTrackPrevExercise = () => {
    const event = {
      type: 'track',
      next: false,
      previous: true,
    };
    sendEvent(event);
  };

  const handleEndSession = () => {
    if (ws.current) {
      ws.current.close();
      Alert.alert('Session ended, WebSocket connection closed.');
      router.push('/GymHall')
    }
  };

  if (noWorkout) {
    return (
      <View style={styles.container}>
        <Text>No workout assigned. You can start your session now.</Text>
        <Button onPress={handleStartExercise} mode='contained' >Start Session</Button>
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Loading workout data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerb}><Text style={styles.header}>Workout:</Text> {workout.name}</Text>
      {currentExercise ? (
        <>
          <Text style={styles.subHeader}>
            Exercise: {currentExercise.exercise_details.name}
          </Text>

          <View style={styles.exerciseDetails}>
            <Text style={styles.exerciseName}>
              Exercise: {currentExercise.exercise_details.name}
            </Text>
            <Text style={styles.exerciseDescription}>
            {currentExercise.exercise_details.description}
            </Text>
            <Text style={styles.exerciseDescription}>Muscle Group: {currentExercise.exercise_details.muscle_group}</Text>
          </View>

          <View>
            <Text style={styles.TE}>Equipment Status: {equipmentStatus}</Text>
          </View>

          {currentExercise.video_path ? (
            <Image
              source={{ uri: `${im}${currentExercise.video_path}` }}
              style={styles.video}
            />
          ) : (
            <Text>No video available for this exercise</Text>
          )}

        </>
      ) : (
        <Text style={styles.TE}>PLEASE PRESS ON  'NEXT EXERCISE' BELOW TO YOUR FIRST EXERCISE </Text>
      )}

      <Button
        onPress={handleStartExercise} mode='outline'  textColor='#fff'  style={styles.bb} >Start Exercise</Button>
      
        <Button onPress={handleFinishExercise} mode='outlined' textColor='#a1E533' style={{boarderColor: '#a1E533'}}>Finish Exercise</Button>
      

      <View style={styles.navigationButtons}>
        <Button onPress={handleTrackPrevExercise} textColor='#a1E533' >` Previous Exercise</Button>
        <Button onPress={handleTrackNextExercise} textColor='#a1E533'>Next Exercise >> </Button>
      </View>
      
      
      <Card.Actions>
                                <IconButton
                                 style={styles.iconButton}
                                    icon="stop"
                                    color="red"
                                    size={30}
                                    onPress={handleEndSession}
                                />
                            </Card.Actions>
                                    
            </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor:'#2c2c2c'
  },
  contentContainer: {
    justifyContent: 'center',
  },
  header: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#a1f553'
  }, 
   headerb: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff'
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color:'#a1f553',

  },
  exerciseDetails: {
    marginBottom: 20,
  },
  iconButton: {
    marginLeft:0 ,
    padding: 2,
    alignItems: 'center',
    alignContents: 'center',
    color:'red',
    backgroundColor:'red'
},
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#fff'
  },
  exerciseDescription: {
    fontSize: 16,
    marginBottom: 5,
    color:'#999'
  },
  video: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    marginTop:20
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  TE:{
    fontSize: 14,
    marginBottom: 5,
    marginTop:5,
    color:'#fff'
  }, 
  bb:{
    marginBottom:5,
    boarderColor:'#a1E533'
  }
});

export default SessionScreen;
