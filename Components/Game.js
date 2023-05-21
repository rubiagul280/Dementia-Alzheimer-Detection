/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/Colors';

export default function Game({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
        style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('MemoryGame')}>
          <Button mode="contained" style={styles.button}>
            Memory Game
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Hangman')}>
          <Button mode="contained" style={styles.button}>
            Hangman
          </Button>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.game,
  },
  button: {
    marginTop: 50,
    marginLeft: 80,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
});
