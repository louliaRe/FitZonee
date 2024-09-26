import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { FAB } from 'react-native-paper';
import GroupList from '../../components/GroupList';
import CreateGroupModal from '../../components/CreateGroupModal';
import { getGroups } from '../API/CoachAPI';
import { useAuth } from '../AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const GroupsOfCoachScreen = () => {
  const { authState } = useAuth();
  const router= useRouter();
  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const fetchedGroups = await getGroups(authState.accessToken);
      if (fetchedGroups && Array.isArray(fetchedGroups)) {
        setGroups(fetchedGroups);
        setLoading(false);
      } else {
        console.error("Fetched groups are invalid", fetchedGroups);
      }
    } catch (error) {
      console.log('Error fetching groups', error);
      alert(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchGroups();
  }, []);

  const handlePressIn = () => {
    setShowText(true);
  };
  const handlePressOut = () => setShowText(false);


  const handleCreateGroup = (newGroup) => {
    if (newGroup) {
      setGroups([...groups, newGroup]);
    } else {
      console.error("Attempted to add an undefined group");
    }
  };

  return (
    <View style={styles.container}>
           <TouchableOpacity 
        style={styles.iconButton} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push('/PendingClientList')}
      >
        <Icon name="person-add" size={24} color="#fff" style={styles.requestIcon} />
        {showText && <Text style={styles.requestButtonText}>View Pending Requests</Text>}
      </TouchableOpacity>

      <GroupList groups={groups} />


      <FAB
        style={styles.fab}
        icon="plus"
        label="Create New Group"
        onPress={() => setIsModalVisible(true)}
      />

      <CreateGroupModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onSubmit={handleCreateGroup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#a1E533',
  },
  iconButton: {
    backgroundColor: '#a1E533', // Green color for the button
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf:'flex-end',
    width: 80, 
    height: 50,
    borderRadius: 10,
    position: 'relative',
    right: 20,
    top: 5,
    marginBottom: 30,
  },
  requestIcon: {
    // Center icon in the square
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'relative',
    top: 0, 
    right:60,
    backgroundColor: '#a1E533', // Match button background
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default GroupsOfCoachScreen;
