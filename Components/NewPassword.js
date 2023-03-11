/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './Colors';

export default function NewPassword({navigation}) {

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.image}>
          <Ionicons name="md-lock-closed" color="#6750A4" size={90} style={styles.icon} />
        </View>
        <View style={styles.content}>
        <Text style={styles.title}>Create New Password</Text>
          <Text style={styles.text}>
            Your new password must be different from previously used password
          </Text>
          <TextInput
            mode="outlined"
            label="Password"
            style={styles.input}
            secureTextEntry={true}
            theme={{
              roundness: 25,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('New Password')}>
            <Button mode="contained" disable style={styles.button}>
              Save
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 580,
    backgroundColor: '#F3EDF7',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    marginTop: 45,
  },
  text: {
    marginBottom: 10,
    textAlign: 'center',
    alignContent: 'center',
    color: colors.greytxt,
    padding: 10,
    fontSize: 16,
  },
  content: {
    padding: 5,
    marginTop: 10,
  },
  input: {
    marginBottom: 28,
    width: 300,
    marginLeft: 0,
    borderRadius: 8,
  },
  button: {
    marginTop: 35,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
  },
  title: {
    color: colors.background,
    fontSize: 21,
    marginTop: 10,
  },
});
