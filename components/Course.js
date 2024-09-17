import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Course = ({ course }) => {
  const router = useRouter();
  const formattedTime = new Date(course.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePress = (course) => {
    router.push({pathname:'/CourseDetails',
    params: {course: JSON.stringify(course)} });
  };

  return (

    <Card style={styles.card} onPress={()=>handlePress(course)}>
          {/* <TouchableOpacity key={course.id} }> */}

      <Card.Cover source={{ uri: course.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{course.name}</Text>
        <View style={styles.row}>
          <Text style={styles.description}>Description</Text>
          <View style={styles.priceRow}>
            <FontAwesome name="money" size={16} color="#8ee53f" style={styles.icon} />
            <Text style={styles.price}>${course.price}</Text>
          </View>
        </View>
        <View style={styles.timeRow}>
          <Icon name="access-time" size={16} color="#8ee53f" style={styles.icon} />
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
      </View>
      {/* </TouchableOpacity> */}

    </Card>

  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 10,
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
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Adjusts space above the time row
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8ee53f',
  },
  price: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5, // icon, test
  },
  time: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5, //  between  icon , time text
  },
  icon: {
    marginRight: 5,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default Course;
