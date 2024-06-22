// app/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CustomTextInput from '@/components/CustomTextInput';
import Logo1 from '@/components/Logo1';
import _layout from './(tabs)/_layout';

const Login: React.FC = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const handleLogin = () => {
    if (Email.trim() === '' || Password.trim() === '') {
      onToggleSnackBar();
    } else {
      console.log('Logged in');
      router.push('/Services'); //navigate to 
    }
  };

  return (
    <View style={styles.container}>
       <Logo1 />

      <CustomTextInput
        label="Email"
        value={Email}
        onChangeText={(e) => setEmail(e)}
        autoFocus
      />

      <CustomTextInput
        label="Password"
        value={Password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry
      />

      <Button style={styles.btn}  mode="contained" onPress={handleLogin}>
        Login
      </Button>

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
          <Text style={{ color: '#fff' }}>Email & password cannot be empty.</Text>
        </View>
      </Snackbar>

      <View style={styles.signupContainer}>
        <Text style={{ color: '#fff' }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/SignUp')}>
          <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 30,
    width: '90%',
    marginBottom: 20,
    backgroundColor:'#a9f368' 
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Login;
