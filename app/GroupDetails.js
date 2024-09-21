// import React, {useEffect, useState} from 'react';
// import { ScrollView, StyleSheet, View, Text, ActivityIndicator  } from 'react-native';
// import ClientCard from '../../components/ClientCard';
// import MainView from '../../components/MainView';
// import { useSearchParams } from 'expo-router';
// import {getGroupDetails} from './API/CoachAPI';
// import { useAuth } from './AuthContext';

// const GroupDetails = () => {
//   const { group: group_id } = useSearchParams(); 
//   const {authState}= useAuth();
//   const [group, setGroup] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   console.log('G_id', group_id);
//   useEffect(() => {
//     const fetchGroup = async () => {
//       try {
//         const response = await getGroupDetails(group_id, authState.accessToken);
//        console.log("res of get group details inside com", response);
//         setGroup(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         alert(error);
//         setLoading(false);
//       }
      
//     };
//     getGroupDetails();
//   },[group_id,authState.accessToken]);

//   if (loading) {
//     return (
//       <MainView>
//         <ActivityIndicator size="large" color="#a1E533" />
//       </MainView>
//     );
//   }

//   if (error) {
//     return (
//       <MainView>
//         <Text style={styles.error}>{error}</Text>
//       </MainView>
//     );
//   }

//   return (
//     <MainView>
//       <View style={styles.container}>
//         {/* Group Info Section */}
//         {group && (
//           <View style={styles.groupInfoContainer}>
//             <Text style={styles.groupTitle}>Group {group.id}</Text>
//             <Text style={styles.groupDetails}>Start Hour: {group.start_hour}</Text>
//             <Text style={styles.groupDetails}>Session Length: {group.session_length} minutes</Text>
//             <Text style={styles.groupDetails}>Group Capacity: {group.group_capacity}</Text>
//             <Text style={styles.groupDetails}>Days Off: {Object.values(group.days_off).join(', ')}</Text>
//           </View>
//         )}

//         <Text style={styles.title}>Clients</Text>
//         <ScrollView>
//           {group?.clients?.map((client) => (
//             <ClientCard key={client.id} client={client} />
//           ))}
//         </ScrollView>
//       </View>
//     </MainView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   groupInfoContainer: {
//     padding: 15,
//     backgroundColor: '#292929',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   groupTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#a1E533',
//     marginBottom: 10,
//   },
//   groupDetails: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#fff',
//   },
//   error: {
//     color: 'red',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default GroupDetails;