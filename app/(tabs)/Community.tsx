// Community.tsx
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Post from '../../components/Post';
import MainView from '../../components/MainView';

interface PostData {
  id: string;
  publisher: string;
  content: string;
}

const staticPosts: PostData[] = [
  { id: '1', publisher: 'Judy', content: 'hey , i am judy i want a nice gym .' },
  { id: '2', publisher: 'Nour', content: "it's a post." },

];

const Community: React.FC = () => {
  return (
    <MainView>
    <ScrollView style={styles.container}>
      {staticPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ScrollView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default Community;
