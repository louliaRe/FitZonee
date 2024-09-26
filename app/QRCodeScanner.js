import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { View, Text,  Alert, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { useAuth } from './AuthContext';
import { useRouter } from 'expo-router';
import { Check } from './API/ClientAPI';
import MainView from '../components/MainView';

const QRCodeScanner = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [scanned, setScanned] = useState(false);
  const [info , setInfo]= useState({});
  const [details, setDetails] = useState({});
  const [clientApproved, setClientApproved] = useState(false);

  console.log("auth in scanner",authState)


  useEffect(() => {
    if (authState.accessToken && authState.branch_id) {
        console.log("dd")
      const qr = async () => {
        console.log("iiinnn ")

        try {
            console.log("in try")

          const result = await Check(authState.accessToken, authState.branch_id);
          console.log('res of qr', result);
          setInfo(result.workout);
          setDetails(result.diagram);
        } catch (error) {
          console.error('Error during QR check:', error);

          Alert.alert('Error', error);
        }
      };
  
      qr();
    }
  }, [authState.accessToken, authState.branch_id]);
  

  const handleBarCodeScanned = ({ type, data }) => {
    console.log('data in', data)
    router.push({pathname:('/SessionScreen'),
params:{info: JSON.stringify(info),
    details: JSON.stringify(details),}
});
  };

  const handleStartSession = () => {
    //without 
    router.push({pathname:('/SessionScreen'),
params:{info: JSON.stringify(info),
    details: JSON.stringify(details),}
});
  };

  return (
<MainView>
    <View  style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1, width: '100%' }}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {/* Manually start session */}
      <Button
        
        onPress={handleStartSession}
        style={styles.btn}
        textColor='#fff'
      >Start Session Without QR</Button>
    </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  btn:{
   backgroundColor: '#a1E533',
    margrinBottom: 20,
    color:'#a1E533'
  },
  container:{
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
})


export default QRCodeScanner;
