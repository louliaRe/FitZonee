import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './app/_layout'
import { CartProvider } from './components/Cart';

function App() {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}

export default App;