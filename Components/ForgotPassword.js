/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Alert} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ForgotScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState({ message: '', isError: false });

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Function to send the verification code to the user's email
  const sendVerificationCode = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setError('');
        Alert.alert('Verification link sent to your email');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError({ message: 'Please enter your email', isError: true });
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError({ message: 'Please enter a valid email address', isError: true });
    } else {
      setEmailError({ message: '', isError: false });
      return true;
    }
    return false;
  };

  const onSend = function () {
    if (validateEmail()) {
      sendVerificationCode();
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={18}
            color={colors.background}
            onPress={() => navigation.navigate('Login')}
          />
          <Text style={styles.heading}>Forgot Password</Text>
        </View>
        <View style={styles.image}>
          <Icons
            name="security"
            color="#6750A4"
            size={90}
            style={styles.icon}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.text}>
            Please enter your email address to receive a verification link
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
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {emailError.isError ? (
              <Text style={[styles.errorText, { color: 'red' }]}>{emailError.message}</Text>
            ) : null}
          <TouchableOpacity onPress={onSend}>
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
  header: {
    flexDirection: 'row',
    marginBottom: 70,
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
    marginTop: 55,
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
