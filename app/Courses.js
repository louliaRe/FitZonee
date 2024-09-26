import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import MainView from '../components/MainView';
import { Searchbar } from 'react-native-paper';
import Course from '../components/Course';
import { useRouter } from 'expo-router';
import {getClasses} from './API/ClientAPI';
import { useAuth } from './AuthContext';


const Courses = () => {
  const [loading, setLoading]= useState(false)
  const router = useRouter();
  const { authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courses, setCourses]= useState([]);


useEffect(()=>{
  const fetchCourses= async ()=>{
    setLoading(true);
  try{
   
    const res = await getClasses(authState.accessToken, authState.branch_id);
    console.log("fetchCourses res:", res);
    const validCourses = res.filter(course => course !== null);
    setCourses(validCourses);
    console.log('validCourses', validCourses);
    setLoading(false);
  }catch(e){
    console.log("err fetching courses",e);
    setLoading(false);
  }
};fetchCourses();
},[authState.accessToken, authState.branch_id])

console.log ('courses', courses)

if (loading) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#8ee53f" />
    </View>
  );
}
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
        {courses.length > 0 ? (
        courses.map((course, index) => (
          <Course key={course.class_id} course={course} />
        ))
      ) : (
        <Text style={styles.centerText}>We're sorry, there are no courses yet !</Text>
      )}
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
  }, centerText: {
    textAlign: 'center', // centers text horizontally
    flex: 1,
    justifyContent: 'center', // centers text vertically
    alignItems: 'center',
    fontSize: 16,
    color: '#a1e533',
    paddingVertical: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2d2d2d'
  },
});

export default Courses;
