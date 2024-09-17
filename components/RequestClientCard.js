import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Button ,IconButton, Avatar} from 'react-native-paper';

const RequestClientCard = ({ client, onAccept, onReject }) => {
    const [expanded, setExpanded] = useState(false);


    const handleToggleExpand = () => {
        setExpanded(!expanded);
      };
    console.log("clienr=t inside the request card ", client)
  return (
    <View style={styles.card}>
  {client.client_details.image_path ? (
        <Image source={{ uri: client.client_details.image_path }} style={styles.image} />
      ) : (
        <Avatar.Icon style={styles.image} size={60} icon="account" />
      )}
            <View style={styles.info}>
      <Text style={styles.name}><Text style={styles.title}  >Name:</Text> { client.client_details.username}</Text>
      <View style={styles.details}>
        <Text style={styles.det}>Age: {client.client_details.age}</Text>

                {/* See More Icon/Button */}
        <TouchableOpacity onPress={handleToggleExpand}>
          <IconButton icon={expanded ? "chevron-up" : "chevron-down"} size={10} style={styles.more} />
        </TouchableOpacity>
        </View>
        {expanded && (
    <View>            
        <Text style={styles.det}>Gender: {client.client_details.gender}</Text>
        <Text style={styles.det}>Height: {client.client_details.height} cm</Text>
        <Text style={styles.det}>Current Weight: {client.client_details.current_weight} kg</Text>
        <Text style={styles.det}>BMI: {client.client_details.body_data.BMI}</Text>
        <Text style={styles.det}>Fat Percentage: {client.client_details.body_data.fat_percentage}%</Text>
        <Text style={styles.det}>
          Goal: {client.client_details.current_goal[0].goal}, 
          Target Weight: {client.client_details.current_goal[0].goal_weight} kg
        </Text>
</View>
        )}
        <View style={styles.buttonContainer}>
           
          <Button mode="contained" onPress={onAccept} style={styles.acceptButton}>
            Accept
          </Button>
          <Button mode="outlined" textColor='red' onPress={onReject} style={styles.rejectButton}>
            Reject
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#292929',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    backgroundColor:'#666'
  },
  title:{
    color:"#a1E555",
    fontWeight: 'bold',

  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    color: '#fff',
  },
  details:{
    flex: 1,
   flexDirection:'row',


  },
  det: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
    marginTop:5,

  },
  more: {
    backgroundColor: '#a1E533',
    flex:1,
    justifyContent:'flex-end'
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#a1E533',
  },
  rejectButton: {
    borderColor: '#ff4d4d',
    color: '#ff4d4d',
  },
});

export default RequestClientCard;
