import React, { useState } from 'react';
import { Container, Card, Group , Avatar, TextInput,Button, Textarea } from '@mantine/core';
import PostCard from '../../Components/Employee/PostCard';

const ManagePosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, publisherName: 'Coach Mohannad', publisherImage: '/path/to/image1.jpg', content: 'Join my new class', image: '/Courses.jpg' },
    { id: 2, publisherName: 'Coach Yasmin', publisherImage: '/path/to/image2.jpg', content: 'We will start our class in November! Stay tuned', image: '' },
  ]);

  const [newPost, setNewPost] = useState({ publisherName: '', publisherImage: '', content: '', image: '' });

  const handleApprove = (postId) => {
    console.log(`Approved post with id: ${postId}`);
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleDeny = (postId) => {
    console.log(`Denied post with id: ${postId}`);
    setPosts(posts.filter(post => post.id !== postId));
  };

//   const handleAddPost = (e) => {
//     e.preventDefault();
//     setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
//     setNewPost({ publisherName: '', publisherImage: '', content: '', image: '' });
//   };

//   const handleChange = (e) => {
//     setNewPost({ ...newPost, [e.target.name]: e.target.value });
//   };

  return (
    <Container>
         {/* <Card shadow="sm" padding="lg" style={{ marginBottom: '20px' }}>
        <Group align="center">
          <Avatar src={newPost.publisherImage} alt={newPost.publisherName} />
          <TextInput
            placeholder="Publisher Name"
            type="text"
            name="publisherName"
            value={newPost.publisherName}
            onChange={handleChange}
            required
            style={{ flexGrow: 1, marginLeft: '10px' }}
          />
        </Group>
        <Textarea
          placeholder="What's on your mind?"
          name="content"
          value={newPost.content}
          onChange={handleChange}
          required
          style={{ marginTop: '10px' }}
        />
        <TextInput
          placeholder="Image URL"
          type="text"
          name="image"
          value={newPost.image}
          onChange={handleChange}
          style={{ marginTop: '10px' }}
        />
        <Button onClick={handleAddPost} color="#a1E533" style={{ marginTop: '10px' }}>Add Post</Button>
      </Card> */}
      {posts.map(post => (
        <PostCard 
          key={post.id}
          post={post}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      ))}
    </Container>
  );
};

export default ManagePosts;
