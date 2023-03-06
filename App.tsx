/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './Components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const TabScreens = () => {
  const Tab = createBottomTabNavigator();
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
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome5 name="home" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({color, size}) => (
            <Foundation name="social-game-center" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="ios-settings-outline" color={color} size={size} />
          ),
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
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Detection" component={Detection} />
        <Stack.Screen name="Medication" component={Medication} />
        <Stack.Screen name="AddMedication" component={AddMedication} />
        <Stack.Screen name="Tracker" component={Tracker} />
        <Stack.Screen name="Tabs" component={TabScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;