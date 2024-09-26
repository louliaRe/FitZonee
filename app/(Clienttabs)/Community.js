// Community.js
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PostInClient from '../../components/PostInClient';
import MainView from '../../components/MainView';
import { getPosts } from '../API/ClientAPI';
import { useAuth } from '../AuthContext'

const Community = ({ content }) => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]);
  
  const [loading, setLoading] = useState(false);

  console.log("gym_id", authState.gym_id);



  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const ppost = await getPosts(authState.accessToken);
        console.log("getPosts", ppost);
        setPosts(ppost);
       
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setLoading(false)
      }
    };
    fetchPosts();
  }, [authState.accessToken]);

  return (
    <MainView>
      <ScrollView style={styles.container}>
        {posts.map((post) => (
          <PostInClient key={post.id} post={post} />
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
