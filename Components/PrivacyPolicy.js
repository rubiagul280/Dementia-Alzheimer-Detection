/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, ScrollView} from 'react-native';
import {Divider, Switch, Text} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PrivacyPolicy({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="left" size={18} color={colors.background}
          onPress={() => navigation.navigate('Tabs', { screen: 'Settings' })}/>
          <Text style={styles.heading}>Privacy Policy</Text>
        </View>
          <>
            <View style={styles.content}>
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
              <Text style={styles.text}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Text>
              <Divider />
              <View style={styles.row}>
                <Text style={styles.text}>  Keep in touch with AI Neurologists: Alzheimer Detection {isEnabled ? 'on' : 'off'}</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#B8BDF5'}}
                  thumbColor={isEnabled ? '#290438' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
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
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 80,
    marginTop: -5,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginTop: 5,
    marginBottom: 18,
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    color: colors.greytxt,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginTop: 10,
  },
});
