/* eslint-disable prettier/prettier */

import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {Text, Button} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Feedback({navigation}) {
  // const handlePress = () => {
  //   const recipient = 'aineuro@example.com';
  //   const subject = 'Feedback on my app';
  //   const body = 'Please type your feedback here.';

  //   Linking.openURL(`mailto:${recipient}?subject=${subject}&body=${body}`);
  const email = 'feedback@example.com';
  const subject = 'App Feedback';
  const body = 'Please enter your feedback here...';
  
  const handlePress = async () => {
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Can't open email client`);
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={20}
            color={colors.background}
            onPress={() => navigation.navigate('Settings')}
          />
          <Text style={styles.heading}>Give feedback on AI Neurologists</Text>
        </View>
        <View style={{marginTop: 400}}>
        <Text style={styles.text}>
          What do you like about AI Neurologists: Alzheimer detection?
        </Text>
        <Text style={styles.text}>How can be AI Neurologists be improved?</Text>
        <TouchableOpacity onPress={handlePress}>
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
