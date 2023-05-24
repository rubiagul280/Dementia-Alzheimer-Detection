/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  View,
  Modal,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/Colors';

export default function Game({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


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
              onPress={toggleModal}>
              Game Instructions
            </Button>
            <Modal visible={modalVisible} animationType="slide" onRequestClose={toggleModal}>
              <ScrollView>
                <View style={styles.content}>
                  <View style={styles.head}>
                    <Text style={styles.title}>Game Instructions</Text>
                    <TouchableWithoutFeedback
                      onPress={() => setModalVisible(false)}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('./../assets/images/CloseIcon.png')}
                          resizeMode="contain"
                          style={{
                            height: '40%',
                            width: '40%',
                            marginLeft: 180,
                            marginTop: -5,
                          }}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <Text style={styles.heading}>Memory Game Instructions</Text>
                  <Text style={styles.text}>
                    1. Gameplay:{'\n'}{'\n'}
                    - Flip two cards face-up in each turn.{'\n'}
                    - If the cards match, they remain face-up, and you earn a point. {'\n'}
                    - If the cards do not match, they are flipped back face-down.{'\n'}
                    - Remember the positions of the cards as you continue playing.{'\n'}
                    - Continue flipping pairs of cards until all matches are found.{'\n'}{'\n'}
                    2. Winning: {'\n'}{'\n'}- The game is won when all pairs of cards are successfully matched. {'\n'}{'\n'}
                    3. Tips: {'\n'}{'\n'}- Concentration and memory skills are crucial. Pay attention to the symbols on each card and try to remember their positions for future turns.
                  </Text>
                  <Text style={styles.heading}>Hangman Game Instructions</Text>
                  <Text style={styles.text}>
                    1. Gameplay:{'\n'}{'\n'}
                    - Guess letters one at a time by suggesting a letter.{'\n'}
                    - If the suggested letter is present in the word, reveal all occurrences of that letter in the word. {'\n'}
                    - If the suggested letter is not in the word, add a body part to the hangman figure.{'\n'}
                    - Continue guessing letters until the word is fully revealed or the hangman figure is complete.{'\n'}{'\n'}
                    2. Winning: {'\n'}{'\n'}- The game is won if the player guesses all the letters in the word before the hangman figure is complete.{'\n'}
                    - The game is lost if the hangman figure is complete before the word is fully revealed.{'\n'}{'\n'}
                    3. Tips: {'\n'}{'\n'}-  Start with the most common letters in the English language (e.g., "E", "A", "R") and try to deduce the word based on the revealed letters and your knowledge of possible words.
                  </Text>
                </View>
              </ScrollView>
            </Modal>
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
