/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/Colors';

export default function Game({ navigation }) {

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
        style={styles.container}
      >
        <ImageBackground
          source={require('../assets/images/PuzzleBackground.jpeg')}
          style={styles.imageBackground}
          imageStyle={styles.backgroundImage}
        >
          <View >
            <Text style={styles.header}>CHOOSE GAME WHICH YOU WANT TO PLAY</Text>
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
            <Button
              style={styles.instructions}
              onPress={() => navigation.navigate('Instructions')}>
              Game Instructions
            </Button>
          </View>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    color: '#000',
    marginTop: '50%',
    marginBottom: 50,
    textAlign: 'center',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    marginTop: 30,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignSelf: 'center',
    paddingTop: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  instructions: {
    width: 300,
    height: 50,
    color: colors.background,
    fontWeight: '600',
    marginTop: 30,
    textAlign: 'center',
    marginLeft: 35,
  },
  heading: {
    fontSize: 17,
    color: 'black',
    marginBottom: 10,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    // color: 'black',
  },
  content: {
    padding: 20,
  },
  close: {
    color: '#000',
  },
});
