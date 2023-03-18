/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AddMedication({navigation}) {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={18}
              color={colors.background}
              onPress={() => navigation.navigate('Tabs')}
            />
            <Text style={styles.heading}>Add Medication</Text>
          </View>
          <View >
            <Text style={styles.text}>
              Add your medication detail for reminding
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: -85,
    marginTop: 20,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 80,
    marginBottom: 20,
  },
  
});
