/* eslint-disable prettier/prettier */

import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from '../assets/colors/Colors';
import About from '../Components/About';
import Detection from '../Components/Detection';
import Medication from '../Components/Medication';
import AddMedication from '../Components/AddMedication';

export default function HeaderShown({navigation}) {
  const Stack = createNativeStackNavigator();
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
        headerShown: true,
      }}>
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Detection" component={Detection} />
      <Stack.Screen name="Medication" component={Medication} />
      <Stack.Screen name="AddMedication" component={AddMedication} />
    </Stack.Navigator>
  );
}
