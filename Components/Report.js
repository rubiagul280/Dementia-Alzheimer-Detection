/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Detection from './Detection';

const ReportGenerator = async ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    cnic: '',
    city: '',
    martialStatus: '',
  });

  const onReport = async () => {
    try {
      const currentUser = auth().currentUser;
      const {uid} = currentUser;
      const reportRef = firestore()
        .collection('users')
        .doc(uid);

      await reportRef.set({
        Age: age,
        Gender: medform,
        CNIC: cnic,
        MartialStatus: martialStatus,
        City: city,
      });
      navigation.navigate('Medication');
    } catch (err) {
      Alert.alert('Fill all the medication fields');
    }
  };

  const generateReport = async imagePath => {
    const currentUser = auth().currentUser;
    const {uid} = currentUser;

    const name = currentUser.name;
    const department = 'Neurology';
    const diseaseName = label;
    const percentage = parseFloat(result).toFixed(2) * 100;

    const report = getHtmlString(
      name,
      department,
      diseaseName,
      percentage,
      imagePath,
    );

    try {
      const options = {
        html: report,
        fileName: 'detection_report',
        directory: 'Documents',
      };
      if (!uid) {
        console.log('Not logged in');
        return;
      }

      // Generate the PDF.
      const pdf = await RNHTMLtoPDF.convert(options);

      // Create a reference to the Firestore collection for the user's reports.
      const reportsRef = firestore()
        .collection('users')
        .doc(uid)
        .collection('reports');

      // Create a new document in the reports collection with a unique ID.
      const newReportRef = reportsRef.doc();
      setIsLoading(true);
      await uploadMedia(
        `reports/${currentUser.uid}/Report.pdf`,
        pdf.filePath,
        val => {
          setPdfUrl(val);
        },
      )
        .catch(e => console.log('Error downloading url ', e))
        .finally(() => setIsLoading(false));

      //return;

      // Upload the PDF to Firebase Storage and get the download URL.
      const storageRef = storage().ref(`reports/${newReportRef.id}.pdf`);
      const uploadTask = storageRef.putFile(pdf.filePath);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {
          console.error('Error uploading PDF:', error);
        },
        async () => {
          const downloadUrl = await storageRef.getDownloadURL();

          // Save the download URL in the Firestore document for the report.
          await newReportRef.set({
            fileName: pdf.fileName,
            downloadUrl,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log('downloadUrl ===> ,');

          // Set the PDF URL to show it on the screen.
          setPdfUrl(downloadUrl);
        },
      );
    } catch (error) {
      Alert.alert('There is some error to generate report');
    }
  };

  useEffect(() => {
    if (pdfUrl) {
      // Show the PDF in a WebView component.
      return () => {
        setPdfUrl(null);
      };
    }
  }, [pdfUrl]);




  return (
    <View>
      <Text>Click the button to generate the report.</Text>
      <Button title="Generate Report" onPress={generateReport} />
    </View>
  );
};

export default ReportGenerator;
