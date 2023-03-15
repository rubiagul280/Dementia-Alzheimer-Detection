/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import colors from '../assets/colors/Colors';

export default function ForgotScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Function to send the verification code to the user's email
  const sendVerificationCode = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setError('');
        alert('Verification code sent to your email');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const verifyCode = () => {
    const credential = auth.EmailAuthProvider.credential(email, code);

    auth()
      .signInWithCredential(credential)
      .then(() => {
        setError('');
        alert('Code verified successfully');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  // Function to verify the verification code and change the password
  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match');
      return;
    }

    const user = auth().currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        setError('');
        alert('Password updated successfully');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View style={styles.container}>
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
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={sendVerificationCode}>
            <Button mode="contained" disable style={styles.button}>
              Send
            </Button>
          </TouchableOpacity>
          <Text>Enter the verification code:</Text>
          <TextInput value={code} onChangeText={text => setCode(text)} />
          <Button title="Verify code" onPress={verifyCode} />
          <Text>Enter your new password:</Text>
          <TextInput
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            secureTextEntry
          />

          <Text>Confirm your new password:</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />

          <Button title="Change password" onPress={changePassword} />

          {error ? <Text>{error}</Text> : null}
        </View>
        {/* <View>
            <Text style={styles.title}>Verify Email</Text>
            <TextInput
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              maxLength={4}
            />
            <TextInput
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
            />
            <Button
              title="Change Password"
              onPress={verifyCodeAndChangePassword}
              disabled={!newPassword || newPassword === email} // Prevent the user from changing the password to the same as the old one
            />
          </View>
          ) : null}
        </View> */}
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
