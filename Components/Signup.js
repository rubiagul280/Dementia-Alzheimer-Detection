/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import * as React from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity, Alert} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import colors from './Colors';

export default function Signup({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signup = async() => {
    try {
      const doRegister = await auth().createUserWithEmailAndPassword(email, password);
      if (doRegister.user) {
        if (password.length === '8'){
          alert('Account registered successfully');
          navigation.navigate('Login');
        }
      }
    } catch (e) {
         alert('Login failed');
         Alert.alert(e.message);
    }
  };

  return (
    <>
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
          <Text style={styles.passtxt}>
            Password must be at least 8 characters.
          </Text>
          <TouchableOpacity onPress={() => signup()}>
            <Button mode="contained" style={styles.button}>
              Sign up
            </Button>
          </TouchableOpacity>

          <TouchableOpacity>
            <Button mode="contained" icon="google" style={styles.button}>
              Sign up with Google
            </Button>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.accounttxt}>Already have an account?</Text>
            <Button style={styles.signup} onPress={() => navigation.navigate('Login')}>Login</Button>
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
    borderColor: colors.background,
    borderRadius: 20,
  },
  button: {
    marginTop: 28,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 7,
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
});
