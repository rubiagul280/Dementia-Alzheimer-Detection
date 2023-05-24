/* eslint-disable prettier/prettier */

import React  from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Instructions({navigation}) {

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
              onPress={() => navigation.navigate('Tabs', { screen: 'Game' })}
              style={styles.back}
            />
            <Text style={styles.head}>Game Instructions</Text>
          </View>
          <>
          <View style={styles.content}>
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
    marginTop: 30,
    marginBottom: 20,
  },
  head: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 70,
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
    // color: 'black',
  },
  back: {
    marginTop: 1,
  },
});
