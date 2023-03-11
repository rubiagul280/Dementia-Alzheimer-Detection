/* eslint-disable prettier/prettier */

import React from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assets/colors/Colors';

export default function VerficationScreen({navigation}) {

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.image}>
          <Icons name="email-open-multiple-outline" color="#6750A4" size={90} style={styles.icon} />
        </View>
        <View style={styles.content}>
        <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.text}>
            Please enter the 4 digits code sent to your email
          </Text>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.input}
            theme={{
              roundness: 25,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('New Password')}>
            <Button mode="contained" disable style={styles.button}>
              Verify
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Forgot Password</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     autoCapitalize="none"
    //     keyboardType="email-address"
    //   />
    //   <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
    //     <Text style={styles.buttonText}>Reset Password</Text>
    //   </TouchableOpacity>
    // </View>
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
