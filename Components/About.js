/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from './Colors';

export default function About({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <View
          style={styles.container}>
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Getting more from Dementia</Text>
              <Text style={styles.text}>
                This app is driven by Artifical Neural Network technology that
                detects Alzheimer with the existing medical data and checkup by
                patient's attribute information.
              </Text>
              <Text style={styles.text}>
                This is the most advanced disease detector that uses artifical
                intelligence to evaluate your disease. Our powerful AI
                technology will help you to check your health status instantly.
              </Text>
              <Text style={styles.heading}>Detect your disease</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Recommendation to overcome Alzheimer</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Generate Report</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Track your medication</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Search nearby Hospitals</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Game Therapy</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.heading}>Voicebot</Text>
              <Text style={styles.text}>Dementia</Text>
              <Text style={styles.text}>
                It is just a detection. You must visit a doctor for checking
                your health and the treatment.{' '}
              </Text>
            </View>
          </>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#fff',
  },
  content: {
    padding: 5,
  },
  heading: {
    fontSize: 17,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 18,
  },
  text: {
    marginBottom: 10,
  }
});
