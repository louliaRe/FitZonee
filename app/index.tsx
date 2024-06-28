// app/login.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { useRouter } from "expo-router";
import CustomTextInput from "../components/CustomTextInput";
import Logo1 from "../components/Logo1";
import _layout from "./(tabs)/_layout";
import MainView from "../components/MainView";

const Login: React.FC = () => {
  
 
  const [color, setColor] = useState("#fff");
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      setColor((prevColor) => (prevColor === "#fff" ? "#a9f368" : "#fff"));
    }, 1500);
    const t = setTimeout(() => {
      router.push("/Login");
    }, 2000);
  }, []);


  return (
    <MainView>
    <View style={styles.container}>
      <Logo1 />
      <Text style={{ color: `${color}`, fontSize: 30 }}>Fit Zone</Text>
    </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 40,
  },
  
});

export default Login;
