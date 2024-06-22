import React from 'react';
import { Text } from 'react-native-paper';
import {View,FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import ServicesCard from'@/components/ServicesCard';
import MainView from '@/components/MainView';
import { useRouter } from 'expo-router';
import Courses from '../Courses';

const services = [
    { id: '1', name: 'Courses', image: require('@/assets/images//Courses.jpg') },
    { id: '2', name: 'Private Training', image: require('@/assets/images//private.jpg')  },
    { id: '3', name: 'Build Body', image: require('@/assets/images/build.jpg')},
  ];

 

const Services =()=>{
    const router= useRouter();

    const handleServ=(serviceName: string)=>{
        if (serviceName=='Courses'){
            console.log('co')
            router.push('/Courses')
        }
        else if(serviceName=='Private Training'){
            router.push('/PrivateTraining')
        }
        else if(serviceName=='Build Body'){
            router.push('/BuildBody')
        }else
          console.log('Unknown service:', serviceName);
     }

    return(
            <MainView>
            <View style={styles.container}>
              <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>handleServ(item.name)}>
                  <ServicesCard ServiceName={item.name} Image={item.image} />
                  </TouchableOpacity>
                )}
              />
            </View>
            </MainView>
          );
        };
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            padding: 8,
          },
        });

export default Services;