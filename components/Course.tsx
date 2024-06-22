import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native'
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; 



interface CourseProps {
    course: {
      name: string;
      price: number;
      image: string;
      time: Date;
    };
  }
const Course: React.FC<CourseProps> = ({ course }) => {
    const formattedTime = course.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Card style={styles.card}>
      <Card.Cover source={{ uri: course.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{course.name}</Text>
        <View style={styles.row}>
        <Text style={styles.description} >Description</Text>
          <Text style={styles.price}>${course.price}</Text>
          </View>
          <View style={styles.row}>
          <Icon name="access-time" size={16} color="#8ee53f" style={styles.icon} />

          <Text style={styles.time}>{formattedTime}</Text>
          </View>
          </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 2,
    width: 353,
    backgroundColor: '#2C2C2C',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  details: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8ee53f',
  },
  price: {
    fontSize: 14,
    color: '#fff',
    margin:15,
  },
  time: {
    fontSize: 14,
    color: '#fff',
    marginRight:250,
    marginTop:10,
    
  },
  icon: {
    marginRight: 5,
    marginTop:10,
  },
  description:{
    fontWeight:'bold',
    fontSize:18,
    color:'#fff'

  }
});

export default Course;