import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Provider, Paragraph, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import {ShowHall} from './API/ClientAPI';
import { useAuth } from './AuthContext'; 
import { Video } from 'expo-av'; // Import Video component


const GymHall = () => {
    const [hallData, setHallData] = useState(null);
    const [loading, setLoading]= useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const { authState } = useAuth();
    
  const im= `http://192.168.43.228:8000`;
    useEffect(() => {
         setLoading(true)
        const fetchHallData = async () => {
            try {
                const res = await ShowHall(authState.accessToken, authState.branch_id);
                console.log('res fetch Hall', res);
                if (res && res.length > 0) {
                    setHallData(res[0]);
                    setLoading(false);
                }
            } catch (e) {
                console.log(e);
            }
        };

        fetchHallData();
    }, [authState.accessToken, authState.branch_id]);
        console.log ("ddd", hallData )
        if (hallData){
            if(hallData?.equipments){
            console.log ("eee", hallData.equipments)
            }else{
                console.log ("no equipments")
            }
        }
    const handleMachinePress = (machine) => {
        console.log("mach", machine)
        setSelectedMachine(machine);
        setModalVisible(true);
         console.log("selec", selectedMachine)
        console.log("ss",  `${im}${selectedMachine?.equipment_details.image_path}`)

    };

    const handleSession = () => {
        console.log('Session started');
        router.push('/QRCodeScanner');
    };

    const renderGrid = () => {
        const gridItems = [];
    
        if (!hallData) {
            return (
                <Text style={styles.centerText}>There is no Hall exist yet!</Text>
            ); 
        }

        const { hallWidth, hallHeight, equipments } = {
            hallWidth: hallData.width,
            hallHeight: hallData.height,
            equipments: hallData.equipments,
        };

        for (let y = 0; y < hallHeight; y++) {
            for (let x = 0; x < hallWidth; x++) {
                const machine = equipments.find(m => m.x_axis === x && m.y_axis === y);
                gridItems.push(
                    <TouchableOpacity
                        key={`${x}-${y}`}
                        style={[
                            styles.gridItem,
                            {
                                backgroundColor: machine ? 'limegreen' : '#666',
                                width: `${100 / hallWidth}%`,
                                height: `${100 / hallHeight}%`,
                            },
                        ]}
                        onPress={() => machine && handleMachinePress(machine)}
                    >
                        {machine ? (
                            <Text style={styles.machineLabel}>{machine.equipment_details.name}</Text>
                        ) : null}
                    </TouchableOpacity>
                );
            }
        }
        return gridItems;
    };

    if (loading) {
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#8ee53f" />
          </View>
        );
      }

    return (
        <Provider style={styles.hall}>
            <View style={styles.container}>
                <Text style={styles.title}>Gym Hall</Text>
                <View style={styles.gridContainer}>
                    {renderGrid()}
                </View>

                <Portal>
                    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalView}>
                        {selectedMachine && (
                            <Card>
                             <ScrollView contentContainerStyle={styles.scrollContainer}>

                                <Card.Title style={styles.title} title={selectedMachine.equipment_details?.name} />
                                <Card.Content>
                                    <Paragraph>{selectedMachine?.equipment_details.description}</Paragraph>
                                    <Text style={styles.status}>{selectedMachine.status}</Text>
                                       {selectedMachine.equipment_details?.image_path && (
                                        <Image
                                            style={styles.image}
                                            source={{ uri: `${im}${selectedMachine.equipment_details.image_path}` }}
                                        />
                                    )}

                                    {selectedMachine.equipment_details?.exercise[0].video_path && (
                                        <Image
                                        style={styles.video}
                                        source={{ uri: `${im}${selectedMachine.equipment_details.exercise[0].video_path}` }}
                                    />
                                    )}
                                </Card.Content>                                
                                <Card.Actions>
                                    <Button mode='outlined' labelStyle={{color:'lime'}}  contentStyle={{ borderColor: 'lime' }} onPress={() => setModalVisible(false)}>Close</Button>
                                </Card.Actions>
                                </ScrollView>
                            </Card>
                        )}
                    </Modal>
                </Portal>
            </View>
            <View style={styles.hall}>
                <Button 
                    mode='contained' 
                    contentStyle={{ backgroundColor: '#a1E533' }} 
                    labelStyle={{ color: '#fff' }}  
                    onPress={() => handleSession()}
                >
                    Start Session
                </Button>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    hall: {
        backgroundColor: '#2c2c2c',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2c2c2c', // Corrected background color
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
        color: '#fff',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 300, // Adjust width according to the grid size
        height: 200, // Adjust height according to the grid size
    },
    gridItem: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#666',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
    },
    machineLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalView: {
        padding: 20,
        margin: 20,
        borderRadius: 10,
        // backgroundColor: '#fff',
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
    },
    scrollContainer: {
        flexGrow: 1, // Make sure content is scrollable
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    video: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 20,
    },
    btn: {
        color: '#a1E533',
    },
    centerText: {
        textAlign: 'center',   
        flex: 1,              
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: 16,
        padding: 20,
        color: 'gray',
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#2d2d2d'
      },

});

export default GymHall;
