import React , { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
interface MainViewProps {
    // Add any other props your component might accept here
  }

const MainView: React.FC<PropsWithChildren<MainViewProps>> = ({ children }) => {
  return (
    <View style={styles.container}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Set the background color to black
  },
});

export default MainView;
