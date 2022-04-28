import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import RegisterScreenPart2 from './src/screens/Register/RegisterScreenPart2';
import PorductView from './src/screens/PorductView';
import ResetPassword from './src/screens/ResetPassword';
import Options from './src/screens/Options';
import Choosen from './src/screens/Choosen';
import Profile from './src/screens/Profile';
import History from './src/screens/History';
import Notifications from './src/screens/Notifications';
import ViewWorker from './src/screens/ViewWorker';
import Delivery from './src/screens/Services-Screens/Delivery';
import Maintenance from './src/screens/Services-Screens/Maintenance';
import HomeCare from './src/screens/Services-Screens/HomeCare';
import HomeDesign from './src/screens/Services-Screens/HomeDesign';
import CareTaking from './src/screens/Services-Screens/CareTaking';
import Tutoring from './src/screens/Services-Screens/Tutoring';
import { Provider as PaperProvider } from "react-native-paper"


import * as ImagePicker from "expo-image-picker"


const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);

  React.useEffect(() => {
    (async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
    })();
  }, []);

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ViewProduct" component={PorductView} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Option" component={Options} />
            <Stack.Screen name="Fav" component={Choosen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterTwo" component={RegisterScreenPart2} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Worker" component={ViewWorker} />
            <Stack.Screen name="Delivery" component={Delivery} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="HomeCare" component={HomeCare} />
            <Stack.Screen name="HomeDesign" component={HomeDesign} />
            <Stack.Screen name="CareTaking" component={CareTaking} />
            <Stack.Screen name="Tutoring" component={Tutoring} />

          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </>
  );
}