/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Alert} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

export default function NewPassword({navigation}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    const user = auth().currentUser;

    // Verify that the old password matches the user's login password
    const credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
    user.reauthenticateWithCredential(credential).then(() => {
      // If the old password is verified, update the user's password to the new password
      user.updatePassword(newPassword).then(() => {
        Alert.alert('Your password is changed successfully');
        setError('');
        setOldPassword('');
        setNewPassword('');
      }).catch(error => {
        setError(error.message);
      });
    }).catch(error => {
      setError(error.message);
    });
  };
  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={20}
            color={colors.background}
            onPress={() => navigation.navigate('Profile')}
          />
          <Text style={styles.heading}>Change Password</Text>
        </View>
        <View style={styles.image}>
          <Ionicons
            name="md-lock-closed"
            color="#6750A4"
            size={90}
            style={styles.icon}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.text}>
            Your new password must be different from previously used password
          </Text>
          <TextInput
            mode="outlined"
            label="Old Password"
            style={styles.input}
            secureTextEntry={true}
            theme={{
              roundness: 25,
            }}
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
          <TextInput
            mode="outlined"
            label="New Password"
            style={styles.input}
            secureTextEntry={true}
            theme={{
              roundness: 25,
            }}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TouchableOpacity onPress={handlePasswordChange}>
            <Button mode="contained" disable style={styles.button}>
              Save
            </Button>
          </TouchableOpacity>
          {error ? <Text style={styles.error}>{error}</Text> : null}
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
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    marginLeft: -70,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 60,
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
    marginBottom: 16,
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
