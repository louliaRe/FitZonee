import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';

const DiseaseSelector = ({ diseases=[] }) => { 

    console.log("DDDDDDD INNNN SELECTOR", diseases)
  const [expanded, setExpanded] = useState(false); 
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const toggleDiseaseSelection = (diseaseId) => {
    if (selectedDiseases.includes(diseaseId)) {
      setSelectedDiseases(selectedDiseases.filter((id) => id !== diseaseId));
    } else {
      setSelectedDiseases([...selectedDiseases, diseaseId]);
    }
  };

  // Show only a few items initially, and all items if "See More" is clicked
  const displayedDiseases = expanded ? diseases : diseases.slice(0, 3);

  return (
    <View style={styles.container}>
     
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
 
});

export default DiseaseSelector;
