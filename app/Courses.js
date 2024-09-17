import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import MainView from '../components/MainView';
import { Searchbar } from 'react-native-paper';
import Course from '../components/Course';
import { useRouter } from 'expo-router';


const Courses = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleCourses = [
    {
      name: 'Course 1',
      price: 40,
      image: ('../../assets/images/Courses.jpg'),
      startTime: '14:00:00',
      endTime: '16:00:00',
      startDate: new Date(new Date().setHours(12,0,0)),
      endDate: new Date(new Date().setHours(12,0,0)),
      daysOfWeek: {
        "6": "friday"
      },
      hallNumber:2,
      allowedCancelDays:1,
      coach: 'jack',
    },
    {
      name: 'Course 2',
      price: 50,
      image: ('../assets/images/Courses.jpg'),
      time: new Date(new Date().setHours(14, 0, 0, 0)),
    },
  ];

  return (
    <MainView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.courseContainer}>
          {sampleCourses.map((course, index) => (
            <Course key={index} course={course} />
          ))}
        </View>
      </ScrollView>
    </MainView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,
  },
  courseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Courses;
