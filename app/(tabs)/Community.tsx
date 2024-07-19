// Community.js
import React,{useState} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Post from '../../components/Post';

const Community = ({ content }) => {
  const [posts, setPosts] = useState([
    { id: '1', publisher: 'Coach Judy', content: "I'll open Zoumba course soon stay tuned!! ." },
    { id: '2', publisher: 'Aunada Gym', content: "Hello,We will make special times of girls!, we're wating for you." },

  ]);
  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:' #211F1F'
  },
});

export default Community;
