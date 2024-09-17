// Community.js
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Post from '../../components/Post';
import MainView from '../../components/MainView';
import { getPosts } from '../API/CoachAPI';
import { useAuth } from '../AuthContext'

const Community = ({ content }) => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  console.log("gym_id", authState.gym_id);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const ppost = await getPosts(authState.accessToken, authState.gym_id);
        console.log("getPosts", ppost);
        setPosts(ppost);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        // set loading(false)
      }
    };
    fetchPosts();
  }, [authState.accessToken, authState.gym_id]);

  return (
    <MainView>
      <ScrollView style={styles.container}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F1F',
  },
});

export default Community;
