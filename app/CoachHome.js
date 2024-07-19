import React, {useState} from "react";
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button } from "react-native-paper";
import Community from './(tabs)/Community';
import CreatePost from "../components/CreatePost";
import MainView from "../components/MainView";
import { useAuth } from "./AuthContext";
import { useRouter } from 'expo-router';


const CoachHome=()=>{
    const {username}= useAuth();
    console.log("username Coach",username)
      const handleCreatePost = (content) => {
        const newPost = {
          id: (posts.length + 1).toString(),
          publisher: 'Coach', 
          content,
        };
        setPosts([newPost, ...posts]);
      };
    
      const handleViewClients = () => {
        router.push('ClientsList'); // Adjust the path based on your routing setup
      };

    return(
        <MainView>
     <ScrollView>
        <Text style={styles.text}>Welcome back coach {username}!!</Text>
      <CreatePost onPost={handleCreatePost}/>
       <Community/>
       <Button title="View Clients" onPress={handleViewClients} />
     </ScrollView>
     </MainView>
    )
}
const styles= StyleSheet.create({
    text:{
          color:"#fff",
          fontWeight: 'bold',
          fontSize: '18px'

        }
})
export default CoachHome;