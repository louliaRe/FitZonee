// Post.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';

interface Comment {
  id: string;
  text: string;
}

interface PostProps {
  post: {
    id: string;
    publisher: string;
    content: any;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: (comments.length + 1).toString(), text: newComment },
      ]);
      setNewComment('');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title 
        title={post.publisher}
        titleStyle={styles.publisherName}
        left={(props) => <Avatar.Icon {...props} icon="account" style={styles.icon} />}
       
      />
      <Card.Content>
        <Text style={styles.post}>{post.content}</Text>
       

      <Card.Actions>
        <Button onPress={() => console.log('Liked post', post.id)} textColor='#a9f368' >Like</Button>
        <Button onPress={handleAddComment} style={styles.commentBu}>Comment</Button>
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
    backgroundColor:'#2C2C2C',
    color:'#a9f368',

  },
  publisherName:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:18,
  },
  commentBu:{
   backgroundColor:'#a9f368'
  },
  icon:{
backgroundColor:'#a9f368',
  },
  post:{
    color:'#fff'
  },
  comment: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title:{
  color:'#a9f368',
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderColor: '#ccc',
    color:'#fff',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Post;
