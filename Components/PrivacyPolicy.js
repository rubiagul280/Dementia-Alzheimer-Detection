/* eslint-disable prettier/prettier */

import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import colors from '../assets/colors/Colors';

export default function PrivacyPolicy({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <View style={styles.container}>
          <>
            <View style={styles.content}>
              <Text style={styles.title}>Getting more from Dementia</Text>
              <Text style={styles.text}>
                You can use AI Neurologists: Alzheimer detection without
                agreeing to these. But by consenting, you allow us to provide
                the best AI Neurologists experience possible. You can manage
                your privacy at any time in Settings. Learn more about how we
                collect, process, and use, you data in our Privacy Policy.
              </Text>
              <Text style={styles.text}>
                This is the most advanced disease detector that uses artifical
                intelligence to evaluate your disease. Our powerful AI
                technology will help you to check your health status instantly.
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
  },
});
