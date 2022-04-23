import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import RegisterScreenPart2 from './src/screens/Register/RegisterScreenPart2';
import AddProduct from './src/screens/AddProduct';
import PorductView from './src/screens/PorductView';
import ResetPassword from './src/screens/ResetPassword';
import Options from './src/screens/Options';
import MyProducts from './src/screens/MyProducts';
import Choosen from './src/screens/Choosen';

import { Provider as PaperProvider } from "react-native-paper"

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="ViewProduct" component={PorductView} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="MyProducts" component={MyProducts} />
            <Stack.Screen name="Option" component={Options} />
            <Stack.Screen name="Fav" component={Choosen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterTwo" component={RegisterScreenPart2} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </>
  );
}