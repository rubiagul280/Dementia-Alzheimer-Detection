/* eslint-disable prettier/prettier */

import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, Button, TextInput} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Feedback({navigation, user}) {
  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  var usercollection = firestore().collection('users');
  const currentUser = auth().currentUser;

  useEffect(() => {
    if (currentUser) {
      // Get the user's email from Firebase
      const email = currentUser.email;

      // Query the Firebase database for the username associated with the email
      usercollection
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const current = doc.data();
            setUsername(current.username);
            setUserEmail(current.email);
          });
        });
    }
  }, []);

  const sendEmail = async () => {
    try {
      if (feedbackMessage !== ''){
        // Store the feedback in Firebase Firestore
      const feedbackRef = firestore().collection('feedback');
      await feedbackRef.doc(currentUser.uid).set({
        email: userEmail,
        username,
        message: feedbackMessage, // Include the feedback body here
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // Show a success message to the user
      Alert.alert('Feedback sent successfully!');
      } else {
        Alert.alert('Please enter your feedback!');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      // Show an error message to the user
      Alert.alert('Failed to send feedback. Please try again.');
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={18}
            color={colors.background}
            onPress={() => navigation.navigate('Settings')}
            style={{marginTop: 2}}
          />
          <Text style={styles.heading}>Give feedback on AI Neurologists</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Text style={styles.text}>
          What do you like about AI Neurologists: Alzheimer detection?
        </Text>
        <Text style={styles.text}>How can be AI Neurologists be improved?</Text>
        <TextInput
            mode="outlined"
            label="Feedback"
            multiline
            style={styles.input}
            secureTextEntry={true}
            value={feedbackMessage}
            onChangeText={text => setFeedbackMessage(text)}
            theme={{
              roundness: 10,
            }}
          />
          <Button mode="outlined" style={styles.button}onPress={sendEmail}>
            Send Feedback
          </Button>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    marginLeft: -10,
    marginBottom: 30,
  },
  heading: {
    color: colors.background,
    fontSize: 14,
    marginLeft: 30,
  },
  button: {
    marginTop: 300,
    width: 300,
    height: 50,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    marginBottom: 7,
    color: colors.background,
  },
  text: {
    fontSize: 17,
    color: colors.background,
    marginTop: 10,
  },
  input: {
    width: 300,
    marginLeft: 0,
    borderRadius: 2,
    height: 100,
    marginTop: 20,
  },
});
