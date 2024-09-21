import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import MainView from '../components/MainView';
import { Searchbar } from 'react-native-paper';
import Course from '../components/Course';
import { useRouter } from 'expo-router';
import {getClasses} from './API/ClientAPI';
import { useAuth } from './AuthContext';


const Courses = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courses, setCourses]= useState([]);


useEffect(()=>{
  const fetchCourses= async ()=>{
  try{
   
    const res = await getClasses(authState.accessToken, authState.branch_id);
    console.log("fetchCourses res:", res);
    const validCourses = res.filter(course => course !== null);
    setCourses(validCourses);
    console.log('validCourses', validCourses);
  }catch(e){
    console.log("err fetching courses",e);
  }
};fetchCourses();
},[authState.accessToken, authState.branch_id])

console.log ('courses', courses)


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
          {courses.map((course, index) => (
            <Course key={course.class_id} course={course} />
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
