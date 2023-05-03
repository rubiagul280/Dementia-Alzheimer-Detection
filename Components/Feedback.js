/* eslint-disable prettier/prettier */

import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import {Text, Button} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

export default function Feedback({navigation}) {

  const sendFeedback = async () => {
    try {
      // Open the user's email client with the pre-filled email
      const supportEmail = 'aineurologists@gmail.com';
      const subject = 'Feedback for AI Neurologists';
      const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`;
      const canOpen = await Linking.canOpenURL(mailtoUrl);

      if (canOpen) {
        await Linking.openURL(mailtoUrl);

        // Wait for the user to send the email and get the feedback message
        const feedbackMessage = await getUserFeedback();

        // Send the feedback message to Firebase project using FCM
        await sendFeedbackToFirebase(feedbackMessage);

        // Store the feedback in Firestore
        await storeFeedbackInFirestore(feedbackMessage);

        // Show a success message to the user
        Alert.alert('Feedback sent successfully!');
      } else {
        // Handle if the user's device does not support opening email client
        Alert.alert('Unable to open email client. Please provide feedback through another method.');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      // Show an error message to the user
      Alert.alert('Failed to send feedback. Please try again.');
    }
  };

  const getUserFeedback = async () => {
    // Implement the logic to retrieve the feedback message entered by the user
    // This can be done through user input fields or any other mechanism in your app
    // For simplicity, let's assume there's a hardcoded feedback message
    const feedbackMessage = '';
    return feedbackMessage;
  };

  const sendFeedbackToFirebase = async (feedbackMessage) => {
    // Get the FCM token for the current device
    const token = await messaging().getToken();

    // Construct the FCM message payload
    const message = {
      token: token, // Target the current device by its FCM token
      notification: {
        title: 'New Feedback',
        body: feedbackMessage,
      },
    };

    // Send the feedback message using FCM
    await messaging().send(message);
  };

  const storeFeedbackInFirestore = async (feedbackMessage) => {
    try {
      // Get a reference to the 'feedback' collection in Firestore
      const feedbackRef = firestore().collection('feedback');

      // Create a new document with an auto-generated ID
      const newFeedbackDoc = await feedbackRef.add({
        message: feedbackMessage,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      // Log the ID of the newly created feedback document
      console.log('New feedback document ID:', newFeedbackDoc.id);
    } catch (error) {
      console.error('Error storing feedback in Firestore:', error);
      // Handle the error as needed
    }
  };

  // const sendEmail = async () => {
  //   try {
  //     // Get the currently authenticated user
  //     const currentUser = auth().currentUser;
  //     // Get the user's email address
  //     const userEmail = currentUser.email;
  //     // Open the user's email client with the pre-filled email
  //     const supportEmail = 'aineurologists@gmail.com';
  //     const subject = 'Feedback for AI Neurologists';
  //     const body = '';
  //     const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  //     await Linking.openURL(mailtoUrl);

  //     // Store the feedback in Firebase Firestore
  //     const feedbackRef = firestore().collection('feedback');
  //     await feedbackRef.add({
  //       userId: currentUser.uid,
  //       email: userEmail,
  //       feedback: body, // Include the feedback body here
  //       timestamp: firestore.FieldValue.serverTimestamp(),
  //     });

  //     // Show a success message to the user
  //     Alert.alert('Feedback sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending feedback:', error);
  //     // Show an error message to the user
  //     Alert.alert('Failed to send feedback. Please try again.');
  //   }
  // };

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
        <View style={{marginTop: 400}}>
        <Text style={styles.text}>
          What do you like about AI Neurologists: Alzheimer detection?
        </Text>
        <Text style={styles.text}>How can be AI Neurologists be improved?</Text>
        <TouchableOpacity onPress={sendFeedback}>
          <Button mode="outlined" style={styles.button}>
            Contact Support
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
    marginTop: 28,
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
  root: {
    alignItems: 'center',
    padding: 29,
    paddingTop: 0,
    paddingBottom: 0,
  },
  Logo: {
    width: 100,
    maxWidth: 150,
    maxHeight: 150,
    height: 150,
    paddingTop: 10,
    paddingBottom: 20,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 23,
    paddingTop: 10,
    color: '#02AABD',
  },

  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  container1: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '40%',
    borderColor: '#02AABD',
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input1: {
    color: '#02AABD',
  },
  linearGradient1: {
    flex: 1,
  },
  aftersafe: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 100,
    marginTop: 10,
  },
  linearGradient: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    paddingEnd: 5,
    borderRadius: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: 'white',
  },
  buttonTextStyleM: {
    color: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});
