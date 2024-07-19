import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Avatar, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainView from '../../components/MainView';
import { useAuth } from '../AuthContext';


interface Course {
  name: string;
  description: string;
}

interface User {
  profilePic: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  plan: string;
  courses: Course[];
}

const staticUser: User = {
  profilePic:'../../assets/images/profile.png',
  name: 'Loulia Rejouleh',
  age: 21,
  height: 158,
  weight: 53,
  gender: 'Female',
  plan: 'Premium Plan',
  courses: [
    { name: 'Course Zumba', description: ' the description for course Zumba.' },
    { name: 'Course Youga', description: ' the description for course Youga.' },
  ],
};

const UserProfile: React.FC = () => {
  const user = staticUser;
  const {authState,logout} = useAuth();
  const { username } = authState;
console.log("user:",username);
 
  return (
    <MainView>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Avatar.Icon  style={styles.pic} size={80} icon="account" />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.details}>Age: {user.age}</Text>
          <Text style={styles.details}>Height: {user.height} cm</Text>
          <Text style={styles.details}>Weight: {user.weight} kg</Text>
          <Text style={styles.details}>Gender: {user.gender}</Text>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Plan</Title>
          <Paragraph style={styles.plan}>{user.plan}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Registered Courses</Title>
          {user.courses.map((course, index) => (
            <View key={index} style={styles.course}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDescription}>{course.description}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
     
      <Button style={styles.btn} onPress={logout}>logout</Button>
    </ScrollView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pic:{
   backgroundColor:'#2C2C2C'
  },
  userInfo: {
    marginLeft: 10,
    marginTop:15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#a1E533',
  },
  btn: {
   
    backgroundColor: '#a1E533',
    color:"#fff",
},
  details: {
    fontSize: 16,
    color: '#fff',
  },
  card: {
    marginVertical: 10,
    backgroundColor:'#2C2C2C',

  },
  plan:{
  color:'#fff'
  },
  title:{
    color:'#a1E533',

  },
  course: {
    marginTop: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#fff',
  },
  courseDescription: {
    fontSize: 14,
    color: '#b4b6d6',
  },
});

export default UserProfile;
