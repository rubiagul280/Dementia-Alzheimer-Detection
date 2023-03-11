/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import colors from '../assets/colors/Colors';

export default function ForgotScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  useEffect(() => {
    // Retrieve user's old password from Firebase Realtime Database
    const dbRef = auth().ref(`/Users/${email}`);
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data && data.password) {
        setOldPassword(data.password);
      }
    });
    return () => dbRef.off();
  }, [email]);

  const sendVerificationCode = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      // Send verification code to email address
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async () => {
    try {
      const auth = auth();
      const { email: emailAddress } = auth.verifyPasswordResetCode(verificationCode);
      if (newPassword === oldPassword) {
        throw new Error('New password cannot be the same as old password');
      }
      await auth.confirmPasswordReset(verificationCode, newPassword);
      await auth().ref(`/Users/${emailAddress}`).set({ password: newPassword });
      // Save new password to Firebase Realtime Database
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.image}>
          <Icons name="security" color="#6750A4" size={90} style={styles.icon} />
        </View>
        <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.text}>
            Please enter your email address to receive a verification code
          </Text>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            theme={{
              roundness: 25,
            }}
          />
          <TouchableOpacity onPress={sendVerificationCode}>
            <Button mode="contained" disable style={styles.button}>
              Send
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
