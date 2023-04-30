/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Button, Divider, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/Colors';
import axios from 'axios';

const GPT_API_KEY = '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';
const GPT_API_URL = 'https://api.openai.com/v1/engine/davinci-codex/completions';

export default function Chat({navigation}) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInput = async text => {
    setInput(text);
    const response = await getCompletion(text);
    setOutput(response);
  };

  const getCompletion = async prompt => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GPT_API_KEY}`,
    };
    const data = {
      prompt: prompt,
      max_tokens: 100,
    };
    try {
      const response = await axios.post(GPT_API_URL, data, {headers});
      return response.data.choices[0].text;
    } catch (error) {
      console.error(error);
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
            style={{marginTop: 3}}
          />
          <Text style={styles.heading}>Chat</Text>
        </View>
        <View>
          <Text style={styles.label}>Enter your prompt:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleInput}
            value={input}
          />
          <Text style={styles.label}>Output:</Text>
          <Text style={styles.output}>{output}</Text>
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
    flexDirection: 'row',
    marginLeft: -110,
    marginBottom: 30,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 90,
  },
  profile: {
    height: 170,
    width: 170,
    alignItems: 'center',
    borderRadius: 100,
    paddingBottom: 10,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: colors.background,
  },
  input: {
    marginBottom: 28,
    width: 300,
    marginLeft: 0,
    borderRadius: 8,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
    fontSize: 16,
  },
  chatButton: {
    backgroundColor: '#007aff',
    borderRadius: 4,
    padding: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatOutputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chatOutput: {
    fontSize: 18,
    textAlign: 'center',
  },
});
