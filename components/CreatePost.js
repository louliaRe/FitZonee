// CreatePost.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Card, Button } from 'react-native-paper';

const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#ccc"
          value={content}
          onChangeText={setContent}
        />
        <Button style={styles.button} mode="contained" onPress={handlePost}>
          Create Post
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: '#2C2C2C',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#1a1a1a',
  },
  button: {
    backgroundColor: '#a9f368',
  },
});

export default CreatePost;
