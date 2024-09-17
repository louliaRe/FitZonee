// Post.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: (comments.length + 1).toString(), text: newComment }]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    console.log("Liked post", post.id);
    // Add your like logic here
  };

  return (
    <Card style={styles.card}>
      <Card.Title 
        title={post.poster}
        titleStyle={styles.publisherName}
        left={(props) => (
          <Avatar.Icon  style={styles.icon} size={45} icon="account" />
          )}
      />
      <Card.Content>
        <Text style={styles.time}>{new Date(post.created_at).toLocaleDateString()}</Text>
        <Text style={styles.post}>{post.content}</Text>
{/*  {new Date(order.created_at).toLocaleDateString() */}
        {post.images && post.images.length > 0 && post.images.map((im) => (
          <Image key={im.id} source={{ uri: im.image }} style={styles.img} />
        ))}

        <Card.Actions>
          <Button onPress={handleLike} textColor='#a1E533'>Like</Button>
          <Button onPress={handleAddComment} textColor='#fff' mode='contained'style={styles.commentbtn} >Comment</Button>
        </Card.Actions>

        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor="#fff"
          value={newComment}
          onChangeText={setNewComment}
        />
        {comments.map((comment) => (
          <Text key={comment.id} style={styles.comment}>
            {comment.text}
          </Text>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#2C2C2C',
    color: '#a1E533',
  },
  publisherName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    backgroundColor: '#a1E533',
  },
  post: {
    color: '#fff',
    marginTop: 10,
  },
  time: {
    color: '#888',
    marginBottom: 10,
    fontSize:10,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  comment: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  commentbtn:{
   backgroundColor: '#a1E533'
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ccc',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Post;
