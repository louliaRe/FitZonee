import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './app/_layout'
import { AuthProvider } from './app/AuthContext';

function App() {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}

export default App;