import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MachineCard = ({ machine, onPress }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const maxDescriptionLength = 50;
  const isLongDescription = machine.description.length > maxDescriptionLength;
  const displayedDescription = expanded || !isLongDescription 
    ? machine.description 
    : machine.description.substring(0, maxDescriptionLength) + '...';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{machine.name}</Text>
        <Text style={styles.description}>{displayedDescription}</Text>

        {isLongDescription && (
          <Text onPress={toggleExpand} style={styles.seeMore}>
            {expanded ? 'See less' : 'See more'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#b4b6d6',
  },
  input:{
    marginBottom:10,
  },
  seeMore:{
   color: '#a1E553',
  },
  // modalTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  //   color: '#fff',
  // },
 
  button: {
    marginTop: 20,
  },


});

export default MachineCard;
