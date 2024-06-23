import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface CustomNumberInputProps extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
  }

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({ label, value, onChangeText, ...rest }) => {
  return (
    <TextInput
      label={label}
      value={value !== null ? value.toString() : ''}
      onChangeText={onChangeText}
      keyboardType="numeric"  
      mode="outlined"
      style={styles.input}
      theme={{
        colors: {
          primary: '#a9f368', // the outline color when focused
          text: '#fff', // Set the text color
          placeholder: '#aaa', // Placeholder color
        },
      }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: 10,
  },
});

export default CustomNumberInput;
