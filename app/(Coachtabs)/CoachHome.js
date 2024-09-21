import React, {useEffect, useState} from "react";
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button } from "react-native-paper";
import Community from '../Community';
import CreatePost from "../../components/CreatePost";
import MainView from "../../components/MainView";
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from "../AuthContext";
import { useRouter } from 'expo-router';
import {getPosts} from '../API/CoachAPI';


const CoachHome=()=>{
    const {authState}= useAuth();
    const [posts, setPosts]= useState([])
    console.log("username Coach",authState.username)


  



    const handleCreatePost = async (formData) => {
      try {
        const newPost = await addPost(authState.accessToken, formData, authState.gym_id);
        // setPosts([newPost, ...posts]);
        console.log("res new post", newPost);
      } catch (error) {
        console.error("Failed to create post:", error);
        alert("Failed to create post: " + error.message);
      }
    };
    
   

    return (
      <MainView>
        <ScrollView>
          {/* <LinearGradient
            colors={['#0022', '#a1E533']}
            style={styles.gradientBackground}
          >
            <Text style={styles.text}>
              Welcome back, Coach {authState.username}!!
            </Text>
          </LinearGradient> */}
          <CreatePost onPost={handleCreatePost} />
          <Community />
        </ScrollView>
      </MainView>
    );
  };
  
  const styles = StyleSheet.create({
    gradientBackground: {
      padding: 20,
      borderRadius: 10,
      margin: 10,
    },
    text: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center',
      textShadowColor: '#000',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5,
      // Optionally, use a custom font
      // fontFamily: 'YourCustomFont',
    },
  });
  
  export default CoachHome;