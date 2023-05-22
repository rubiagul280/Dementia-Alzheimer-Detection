/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function About({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={18}
              color={colors.background}
              onPress={() => navigation.navigate('Tabs')}
              style={{marginTop: 1}}
            />
            <Text style={styles.head}>Getting more from Dementia</Text>
          </View>
          <>
            <View style={styles.content}>
              {/* <Text style={styles.title}>Getting more from Dementia</Text> */}
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
              <Text style={styles.text}>
                1. User will upload the MRI and get the prediction.
              </Text>
              <Text style={styles.text}>
                2. Image format should be JPG and less than 1Mb.
              </Text>
              <Text style={styles.heading}>
                Recommendation to overcome Alzheimer
              </Text>
              <Text style={styles.text}>
                1. The system will recommend precautionary measures or
                treatments to deal with the disease's status after detection and
                prediction.
              </Text>
              <Text style={styles.text}>
                2. The system will recommend treatments such as painkillers,
                anti-inflammatory drugs, and any other therapy based on the
                severity of the disease and its effects.
              </Text>
              <Text style={styles.heading}>Generate Report</Text>
              <Text style={styles.text}>
                1. The system will generate a predictive report once it has
                detected the disease
              </Text>
              <Text style={styles.text}>
                2. User can download and share the report.
              </Text>
              <Text style={styles.heading}>Track your medication</Text>
              <Text style={styles.text}>
                1. The system allows users to keep track of their medication.
              </Text>
              <Text style={styles.text}>
                2. The system allows users to keep track of their medication.
              </Text>
              <Text style={styles.text}>
                3. The user can schedule the timing of medicines and will get
                the reminder
              </Text>
              <Text style={styles.heading}>Game Therapy</Text>
              <Text style={styles.text}>
                1. The system will offer games such as memory games to help them
                remember how to recognize and match colors, patterns, and
                shapes, which improves brain functions, particularly short-term
                memory.
              </Text>
              <Text style={styles.text}>
                2. The system will offer games such as memory games to help them
                remember how to recognize and match colors, patterns, and
                shapes, which improves brain functions, particularly short-term
                memory.
              </Text>
              <Text style={styles.heading}>Chatbot</Text>
              <Text style={styles.text}>
                1. Chatbot will provide customers with consistent support 24/7.
              </Text>
              <Text style={styles.text}>
                2. User can get answers to the queries related to Alzheimer
                disease.
              </Text>
              <Text style={styles.text}>
                It is just a detection. You must visit a doctor for checking
                your health and the treatment.{' '}
              </Text>
              <Text style={styles.heading}>Feedback and settings</Text>
              <Text style={styles.text}>
                1. Users will be able to provide feedback to the system.
              </Text>
              <Text style={styles.text}>
                2. It allows the user to report complaints.
              </Text>
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
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  head: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 30,
    marginTop: -3,
  },
  content: {
    padding: 5,
  },
  heading: {
    fontSize: 17,
    color: 'black',
    marginBottom: 10,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginBottom: 18,
  },
  text: {
    marginBottom: 10,
    color: 'black',
  },
});
