/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Detection from './Detection';

const ReportGenerator = async ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});

  // Function to retrieve user info from Firebase
  const getUserInfo = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const userRef = firebase.firestore().collection('users').doc(uid);
      const doc = await userRef.get();
      if (doc.exists) {
        setUserInfo(doc.data());
      } else {
        console.log('No such user document!');
      }
    } else {
      console.log('No logged-in user!');
    }
  };

  const generateReport = () => {
    getUserInfo(); // Call the function to retrieve user info

    // Assuming detection.js returns the disease result level and confidence as an object
    const detectionResult = Detection();

    // Send the report to a Firestore collection called "reports"
    const reportsRef = firebase.firestore().collection('reports');
    reportsRef
      .add({
        email: userInfo.email,
        resultLevel: detectionResult.resultLevel,
        confidence: detectionResult.confidence,
      })
      .then(() => console.log('Report generated!'))
      .catch(error => console.error(error));
  };

  return (
    <View>
      <Text>Click the button to generate the report.</Text>
      <Button title="Generate Report" onPress={generateReport} />
    </View>
  );
};

export default ReportGenerator;
