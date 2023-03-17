/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import colors from '../assets/colors/Colors';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const doLogin = await auth().signInWithEmailAndPassword(email, password);
      if (doLogin.user) {
        setEmail('');
        setPassword('');
        navigation.replace('Tabs');
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  GoogleSignin.configure({
    webClientId: '952326145960-o2li2etk41ivg4198oaskakmt34imjqp.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <>
      <StatusBar animated={true} backgroundColor="#290438" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.text}>
            Please login with email and password you originally signed up with.
          </Text>
        </View>
        <View style={styles.form}>
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
          <Button
            style={styles.forgotbtn}
            onPress={() => navigation.navigate('Forgot Password')}>
            Forgot Password?
          </Button>

          <TouchableOpacity onPress={() => login(email, password)}>
            <Button mode="contained" style={styles.button}>
              Log in
            </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Tabs'))}>
            <Button mode="contained" icon="google" style={styles.button}>
              Log in with Google
            </Button>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.accounttxt}>Create an account?</Text>
            <Button
              style={styles.signup}
              onPress={() => navigation.navigate('Signup')}>
              Signup
            </Button>
          </View>
        </View>
      </View>
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
    marginTop: 25,
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
    marginBottom: 28,
    width: 300,
    marginLeft: 0,
    borderRadius: 8,
  },
  focusedInput: {
    borderColor: 'blue',
    borderRadius: 8,
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
    color: colors.background,
    alignItems: 'center',
    paddingTop: 4,
    fontWeight: '600',
  },
  signup: {
    width: 70,
    height: 50,
    color: colors.background,
    fontWeight: '600',
    marginTop: 20,
  },
  accounttxt: {
    fontSize: 14,
    marginBottom: 20,
    marginTop: 28,
    marginLeft: 54,
    color: '#83878A',
    fontWeight: 200,
    alignItems: 'center',
  },
});
