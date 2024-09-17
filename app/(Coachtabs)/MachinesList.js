import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, View, Text ,Image} from 'react-native';
import { Modal, Portal, Button, TextInput, Provider ,Checkbox} from 'react-native-paper';
import MachineCard from '../../components/MachineCard';
import MainView from '../../components/MainView';
import { useAuth } from '../AuthContext';
import {getAllMachines, AddExerciseToMachine, getDisease} from '../API/CoachAPI';
import DiseaseSelector from '../../components/DiseasesSelector';
import MediaPicker from '../../components/MediaPicker'


const MachinesList = () => {
  const [visible, setVisible] = useState(false);
  const {authState}= useAuth();
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [disease, setDisease] = useState([]);
  const [video_path, setVideoPath] = useState([]);
  const [expanded, setExpanded] = useState(false); 
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const toggleDiseaseSelection = (diseaseId) => {
    if (selectedDiseases.includes(diseaseId)) {
      setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, diseaseId]);
    }
  };

  // Show only a few items initially, and all items if "See More" is clicked
  const displayedDiseases = expanded ? disease : disease.slice(0, 3);

  useEffect(()=>{
    const getEquipments= async()=>{
      try{
        const response= await getAllMachines(authState.accessToken);
        console.log('response of get machines', response);
        setMachines(response)
      }catch(error){
        console.log('Error in get machines', error);
      }
    }; getEquipments();
  },[])

  useEffect(()=>{
    const fetchDiseases= async()=>{
      try{
        const response= await getDisease(authState.accessToken);
        console.log('response of  fetchDiseases', response);
        setDisease(response)
      }catch(error){
        console.log('Error in get Disease', error);
      }
    }; fetchDiseases();
  },[])



  const openModal = (machine) => {
    setSelectedMachine(machine);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedMachine(null);
    setExerciseName('');
    setExerciseDescription('');
    setMuscleGroup('');
  };
  const handleAddExercise = async (selectedMachine) => {
    const formData = new FormData();

    formData.append('equipment', JSON.stringify({ equipment: selectedMachine.equipment_id }));

    formData.append('name', exerciseName);
    formData.append('description', exerciseDescription);  
    formData.append('muscle_group', muscleGroup);
    
    const formattedDiseases = selectedDiseases.map((id) => ({ id }));
    console.log('Formatted diseases:', formattedDiseases);

    formData.append('diseases', JSON.stringify(formattedDiseases));

    if (video_path && video_path.uri) {
        formData.append('video_path', {
            uri: video_path.uri,
            name: video_path.fileName || video_path.uri.split('/').pop(),
            type: video_path.mimeType || 'image/gif',  
        });
        console.log('Media appended to FormData',video_path.fileName);
    } else {
        console.log('No media selected or invalid media');
    }

    console.log('FormData after adding content:', formData);

    try {
        const addEx = await AddExerciseToMachine(authState.accessToken, selectedMachine.equipment_id ,formData);
        console.log('Exercise added successfully:', addEx);
        alert('Exercise added successfully:', addEx)
    } catch (error) {
        console.error('Error adding exercise:', error);
        alert('Error adding exercise:', error)
    }

    closeModal();
};

return (
  <Provider>
    <MainView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Gym Machines</Text>
        <ScrollView>
          {machines.map((machine) => (
            <MachineCard key={machine.equipment_id} machine={machine} onPress={() => openModal(machine)} />
          ))}
        </ScrollView>
      </ScrollView>

      <Portal>
        <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              Add Exercise to {String(selectedMachine?.name || '')}
            </Text>
            <TextInput
              label="Exercise Name"
              value={exerciseName}
              onChangeText={setExerciseName}
              style={styles.input}
              textColor='#fff'
              placeholderTextColor='#aa5' 
              theme={{
                colors: {
                  primary: '#a1E533', // the outline color when focused
                  text: '#fff', 
                  placeholder: '#aa5', 
                },
              }}
            />
            <TextInput
              label="Description"
              value={exerciseDescription}
              onChangeText={setExerciseDescription}
              style={styles.input}
              textColor='#fff'
              theme={{
                colors: {
                  primary: '#a1E533', // the outline color when focused
                  text: '#fff',
                  placeholder: '#aa5',
                }
              }}
            />
            <TextInput
              label="Muscle Group"
              value={muscleGroup}
              onChangeText={setMuscleGroup}
              textColor='#fff'
              style={styles.input}
              theme={{
                colors: {
                  primary: '#a1E533', // the outline color when focused
                  text: '#fff',
                  placeholder: '#aa5', 
                }
              }}
            />

            {Array.isArray(disease) && disease.length > 0 ? (
              <>
                {displayedDiseases.map((dise) => (
                  <View key={dise.id} style={styles.checkboxContainer}>
                    <Checkbox
                      status={selectedDiseases.includes(dise.id) ? 'checked' : 'unchecked'}
                      onPress={() => toggleDiseaseSelection(dise.id)}
                      color="#a1E533"
                    />
                    <Text style={styles.label}>{dise.name}</Text>
                  </View>
                ))}

                {disease.length > 3 && (
                  <Button
                    mode="text"
                    onPress={() => setExpanded(!expanded)}
                    labelStyle={{ color: '#a1E533' }}
                  >
                    {expanded ? 'See Less' : 'See More'}
                  </Button>
                )}
              </>
            ) : (
              <Text>Loading diseases...</Text>
            )}

            <MediaPicker style={styles.media} onPickMedia={(media) => setVideoPath(media)} />

            <Button mode='contained' onPress={() => handleAddExercise(selectedMachine)} style={styles.addButton}>
              Add Exercise
            </Button>
          </ScrollView>
        </Modal>
      </Portal>
    </MainView>
  </Provider>
);
            }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: '#333',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
    color: '#fff', 
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#444',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#a1E533',
    color: '#444',
  },
  checkboxLabel: {
    color: '#fff', 
  },
  label: {
    color: '#fff',
  },
});

export default MachinesList;
