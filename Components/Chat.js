/* eslint-disable prettier/prettier */

import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React  from 'react';
import Icons from 'react-native-vector-icons/Entypo';
import colors from '../assets/colors/Colors';
import RNKommunicateChat from 'react-native-kommunicate-chat';


export default function Chat({navigation}) {
  //const isDarkMode = useColorScheme() === 'dark';
  const startConversation = () => {
    let conversationObject = {
      appId: '7821b56f011ea2e65887b9365ef5c38b',
    };
    RNKommunicateChat.buildConversation(
      conversationObject,
      (response, responseMessage) => {
        if (response === 'Success') {
          console.log('Conversation Successfully with id:' + responseMessage);
        }
      },
    );
  };


  return (
    <>
      <StatusBar/>
      <View style={styles.container}>
        <Icons name="chat" color={colors.background} size={60} />
        <View>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.title}>
            Here you can talk with your AI Chatbot.
          </Text>
          <View>
          <TouchableOpacity onPress={() => startConversation()}>
            <Button mode="contained" style={styles.button}>
              Start Conversation
            </Button>
          </TouchableOpacity>
          </View>
        </View>

      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 40,
  },
  button: {
    marginTop: 60,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    padding: 7,
    textAlign: 'center',
    marginTop: 15,
    color: colors.greytxt,
  },
});
