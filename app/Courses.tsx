import React, { useEffect,useState } from 'react';
import {Text, StyleSheet,View,ScrollView,Image, FlatList,ActivityIndicator} from "react-native";
import MainView from '@/components/MainView';
import { Searchbar } from 'react-native-paper';
import Course from '@/components/Course';


const Courses: React.FC=()=>{
    const [Courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');


    const sampleCourse = {
        name: 'Example',
        price: 40,
        image:('../assets/images/course.jpg'),
        time: new Date(new Date().setHours(12, 0, 0, 0)),
      };
    return(
        <MainView>
            <ScrollView>
              <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    <View style={styles.courseContainer}>
          <Course course={sampleCourse} />
          </View>
    </ScrollView>
      </MainView>
    );
};
const styles = StyleSheet.create({
    courseContainer: {
        paddingHorizontal: 2,
        marginTop: 5,
      },
})
export default Courses; 