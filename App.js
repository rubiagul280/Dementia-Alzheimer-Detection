/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React from 'react';
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
import Tracker from './Components/Tracker';
import ForgotScreen from './Components/ForgotPassword';
import VerficationScreen from './Components/VerifyEmail';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
 import colors from './Components/Colors';
import NewPassword from './Components/NewPassword';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {
        backgroundColor: '#B8BDF5',
      },
      headerTintColor: colors.background,
      headerTitleStyle: {
        fontWeight: '100',
      },
      headerTitleAlign: 'center',
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="ios-home" color={color} size={size} />
        ),
        headerShown: false,
      }}/>
      <Tab.Screen name="Games" component={Game}
      options={{
        tabBarIcon: ({color, size}) => (
          <Foundation name="social-game-center" color={color} size={size} />
        ),
        headerShown: false,
      }} />
      <Tab.Screen name="Settings" component={Setting}
      options={{
        tabBarIcon: ({color, size}) => (
          <Ionicons name="settings" color={color} size={size} />
        ),
        headerShown: false,
      }} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const StackScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.statusbar,
          alignItems: 'center',
        },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: 200,
        },
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Detection" component={Detection} />
        <Stack.Screen name="Medication" component={Medication} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="Tracker" component={Tracker} />
    </Stack.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen name="Tabs" component={TabScreens} />
        {/* <Stack.Screen name="Stack" component={StackScreens} /> */}
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Detection" component={Detection} />
        <Stack.Screen name="Medication" component={Medication} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="Forgot Password" component={ForgotScreen} />
        <Stack.Screen name="Verify Email" component={VerficationScreen} />
        <Stack.Screen name="New Password" component={NewPassword} />
        <Stack.Screen name="Tracker" component={Tracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
