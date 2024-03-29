import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';
import RegisterScreenPart2 from './src/screens/Register/RegisterScreenPart2';
import ResetPassword from './src/screens/ResetPassword';
import Options from './src/screens/Options';
import Profile from './src/screens/Profile';
import History from './src/screens/History';
import Notifications from './src/screens/Notifications';
import ViewWorker from './src/screens/ViewWorker';
import Maintenance from './src/screens/Services-Screens/Maintenance';
import HomeCare from './src/screens/Services-Screens/HomeCare';
import HomeDesign from './src/screens/Services-Screens/HomeDesign';
import CareTaking from './src/screens/Services-Screens/CareTaking';
import Tutoring from './src/screens/Services-Screens/Tutoring';
import CarService from './src/screens/Services-Screens/CarService';
import { Provider as PaperProvider } from "react-native-paper";
import Contract from './src/screens/Contract';
import MainServ from './src/screens/Services-Screens/MainServ';
import AdminMain from './src/screens/Admin/AdminMain';
import DisplayAccepted from './src/screens/DisplayAccepted';
import WorkerProfile from './src/screens/WorkerProfile';

import * as ImagePicker from "expo-image-picker";

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
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Option" component={Options} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterTwo" component={RegisterScreenPart2} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Worker" component={ViewWorker} />
            <Stack.Screen name="Maintenance" component={Maintenance} />
            <Stack.Screen name="HomeCare" component={HomeCare} />
            <Stack.Screen name="HomeDesign" component={HomeDesign} />
            <Stack.Screen name="CareTaking" component={CareTaking} />
            <Stack.Screen name="Tutoring" component={Tutoring} />
            <Stack.Screen name="CarService" component={CarService} />
            <Stack.Screen name="Contract" component={Contract} />
            <Stack.Screen name="MainServ" component={MainServ} />
            <Stack.Screen name="Accepted" component={DisplayAccepted} />
            <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
            <Stack.Screen name="AdminMain" component={AdminMain} options={{
              headerShown: true,
              headerTitle: "Admin",
            }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="Dark" />
      </PaperProvider>
    </>
  );
}