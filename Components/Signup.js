/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, TextInput, Text, Provider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import colors from '../assets/colors/Colors';
import firestore from '@react-native-firebase/firestore';

export default function Signup({navigation}) {
  const [username, setUsername] = useState('');
  const [usernameValid, setUsernameValid] = useState(true);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordRepeatValid, setPasswordRepeatValid] = useState(true);

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

  const signup = async () => {
    try {
      const doRegister = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (doRegister.user) {
        Alert.alert('Account registered successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigation.navigate('Login');
      }
    } catch (e) {
      Alert('Login failed', e.message);
    }
  };

  const onSignup = async () => {
    // Validate input for username, email, and password
    const usernameIsValid = usernameRegex.test(username);
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = passwordRegex.test(password);
    const passwordRepeatIsValid = password === confirmPassword;

    setUsernameValid(usernameIsValid);
    setEmailValid(emailIsValid);
    setPasswordValid(passwordIsValid);
    setPasswordRepeatValid(passwordRepeatIsValid);
    if (
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordRepeatIsValid
    ) {
      await signup();
      const data = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({
          username: username,
          email: email,
          password: password,
        });

      if (data) {
        return;
      }
    }
  };


  return (
    <>
      <Provider>
        <StatusBar animated={true} backgroundColor="#290438" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.text}>
              Signup with an email and password, or with your Google account.
            </Text>
          </View>
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="Username"
              style={styles.input}
              value={username}
              onChangeText={text => setUsername(text)}
              theme={{
                roundness: 25,
              }}
            />
            {!usernameValid && (
              <Text style={styles.error}>
                Username must contain only letters and numbers
              </Text>
            )}
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
            {!emailValid && (
              <Text style={styles.error}>
                Email should be format of @gmail.com
              </Text>
            )}
            <TextInput
              mode="outlined"
              label="Password"
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              theme={{
                roundness: 25,
              }}
            />
            {!passwordValid && (
              <Text style={styles.error}>
                Password must be at least 8 characters and contain at least one
                number
              </Text>
            )}
            <TextInput
              mode="outlined"
              label=" Confirm Password"
              style={styles.input}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              theme={{
                roundness: 25,
              }}
            />
            {!passwordRepeatValid && <Text style={styles.error}>Please retype the password correctly</Text>}

            <TouchableOpacity onPress={() => onSignup()}>
              <Button mode="contained" style={styles.button}>
                Sign up
              </Button>
            </TouchableOpacity>


            <View style={styles.accview}>
              <Text style={styles.accounttxt}>Already have an account?</Text>
              <Button
                style={styles.signup}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Button>
            </View>
          </View>
        </View>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    padding: 10,
    margin: 5,
    marginTop: 16,
    marginBottom: 10,
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 50,
    paddingTop: 55,
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
    color: colors.heading,
  },
  text: {
    fontSize: 14,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 200,
  },
  input: {
    marginBottom: 8,
    width: 300,
    marginLeft: 0,
    borderColor: colors.background,
    borderRadius: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 8,
  },
  button: {
    marginTop: 28,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
  },
  forgotbtn: {
    width: 300,
    height: 50,
    color: '#0F172A',
    alignItems: 'center',
    paddingTop: 4,
    fontWeight: '600',
  },
  signup: {
    width: 70,
    height: 50,
    color: '#0F172A',
    fontWeight: '600',
    marginTop: 12,
  },
  accounttxt: {
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 28,
    color: colors.greytxt,
    fontWeight: 200,
    alignItems: 'center',
  },
  passtxt: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: -14,
    marginLeft: 10,
    color: colors.greytxt,
    fontWeight: 200,
    alignItems: 'center',
  },
  accview: {
    flexDirection: 'row',
  },
});
