import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ClientCard from '../components/ClientCard';
import MainView from '../components/MainView';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getGroupDetails } from './API/CoachAPI';
import { useAuth } from './AuthContext';


const ClientsList = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const { group } = useLocalSearchParams();
  const [trainees, setTrainees] = useState([]);
  
  let parsedGroup;

  // Parse group 
  try {
    parsedGroup = JSON.parse(group);
  } catch (error) {
    console.error("Failed to parse group:", error);
  }

  console.log("GroupNnnn", parsedGroup);
  console.log("clll", parsedGroup?.clients);
  console.log("group id", parsedGroup?.group_id);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (parsedGroup?.group_id) { 
          const response = await getGroupDetails(parsedGroup.group_id, authState.accessToken);
          console.log("res of get group details inside com", response);
          setTrainees(response.clients);
        } else {
          console.log("Group ID is undefined. Unable to fetch group details.");
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
        alert("Error fetching group details: " + error.message);
      }
    };
    fetchGroup();
  }, [parsedGroup?.group_id, authState.accessToken]);

  console.log("trainees", trainees);

  const handleClientPress = (trainee) => {
    console.log("client:", trainee);
    router.push({
      pathname: "/TraineesProfile",
      params: { client: JSON.stringify(trainee) }
    });
  };

  return (
    <MainView>
      <View style={styles.container}>
        <Text style={styles.title}>Trainers</Text>
        <ScrollView>
          {trainees.map((trainee) => (
            <ClientCard
              key={trainee.client_id.toString()}
              client={trainee}
              onPress={handleClientPress} // Correctly passing the onPress function
            />
          ))}
        </ScrollView>
      </View>
    </MainView>
  );
};

  // return (
  //   <MainView>
  
  //       <ScrollView>
  //         {trainees.map((item) => (
  //           <ClientCard key={item.pk.toString()} client={item} onPress={handleClientPress(item)} />
  //         ))}
  //       </ScrollView>
  //     </View>
  //   </MainView>
  // );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
});

export default ClientsList;
