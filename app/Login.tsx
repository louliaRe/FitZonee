// app/login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CustomTextInput from '../components/CustomTextInput';
import Logo1 from '../components/Logo1';
import { useAuth } from './AuthContext';
import { loginUser } from '../components/authServices';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const[username, setUsername]=useState('');
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
     
    //static coach
      const staticUserCredentials = {
        username: 'coach1',
        email: 'coach@gmail.com',
        password: '123456',
        role: 4, 
        access: 'static_access_token',
        refresh_token: 'static_refresh_token'
    }; const staticClient = {
        username: 'loulia',
        email: 'loulia@gmail.com',
        password: '123456',
        roleC: 5, 
        accessC: 'static_access_token',
        refresh_tokenC: 'static_refresh_token'
    };

    const handleLogin = async () => {
        if (Email.trim() === '' || Password.trim() === '') {
            onToggleSnackBar();
        } else {
            // Check if entered credentials match the static user
            if (username === staticUserCredentials.username && Email === staticUserCredentials.email && Password === staticUserCredentials.password)
             {
                // Perform static user login
                const { access, refresh_token, role } = staticUserCredentials;
                login(access, refresh_token, role, username);
            } else {
                if (username === staticClient.username && Email === staticClient.email && Password === staticClient.password)
                {
                    const { accessC, refresh_tokenC, roleC } = staticClient;
                    login(accessC, refresh_tokenC, roleC, username);
                }

            // try {
            //     const data = await loginUser(username,Email, Password);s
            //     const { access, refresh_token } = data.token;
            //     const role = data.role;
            //     console.log("r", role)
            //     console.log("tok",data.token)
            //     login(access, refresh_token, role);
            // } catch (error) {
            //     console.error("Error logging in:", error);
            //     alert(error.message);
            // }
        }
        }
    };

    return (
        <View style={styles.container}>
            <Logo1 />

            <CustomTextInput
                label="Username"
                value={username}
                onChangeText={(e) => setUsername(e)}
                autoFocus
            />
            <CustomTextInput
                label="Email"
                value={Email}
                onChangeText={(e) => setEmail(e)}
                
            />

            <CustomTextInput
                label="Password"
                value={Password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry
            />

            <Button style={styles.btn} mode="contained" onPress={handleLogin}>
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
        backgroundColor: '#a1E533',
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
