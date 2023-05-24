/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Splash from './Components/Splash';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Setting from './Components/Setting';
import Game from './Components/Game';
import About from './Components/About';
import Detection from './Components/Detection';
import Medication from './Components/Medication';
import AddMedication from './Components/AddMedication';
import HeaderShown from './Screens/HeaderShown';
import ForgotScreen from './Components/ForgotPassword';
import Assessment from './Components/Assessment';
import Profile from './Components/Profile';
import Help from './Components/Help';
import PrivacyPolicy from './Components/PrivacyPolicy';
import Feedback from './Components/Feedback';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './assets/colors/Colors';
import NewPassword from './Components/NewPassword';
import Chat from './Components/Chat';
import Index from './Components/Hangman/Index';
import MemoryGame from './Components/MemoryGame';
import Instructions from './Components/Instructions';


const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#B8BDF5',
        },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: '100',
        },
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={colors.background} size={size} />
          ),
          tabBarLabelStyle: {
            color: colors.background,
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Games"
        component={Game}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="social-game-center" color={colors.background} size={size} />
          ),
          tabBarLabelStyle: {
            color: colors.background,
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-sharp" color={colors.background} size={size} />
          ),
          tabBarLabelStyle: {
            color: colors.background,
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={colors.background} size={size} />
          ),
          tabBarLabelStyle: {
            color: colors.background,
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen name="Tabs" component={TabScreens} />
        <Stack.Screen name="header" component={HeaderShown} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Detection" component={Detection} />
        <Stack.Screen name="Medication" component={Medication} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="Forgot Password" component={ForgotScreen} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Privacy" component={PrivacyPolicy} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Assessment" component={Assessment} />
        <Stack.Screen name="Hangman" component={Index} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="MemoryGame" component={MemoryGame} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Instructions" component={Instructions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
