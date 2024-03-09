import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ProductsScreen from './Screens/ProductsScreen';
import JournalScreen from './Screens/JournalScreen';
import LoginScreen from "./Screens/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" component={HomeScreen}
          // options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;