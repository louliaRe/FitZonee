// components/CustomTextInput.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, value, onChangeText, secureTextEntry = false, ...rest }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      style={styles.input}
      theme={{
        colors: {
          primary: '#a9f368', // the outline color when focused
          text: '#fff', // Set the text color
          placeholder: '#aaa', // Placeholder color
          // Background color of the input
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

export default CustomTextInput;
