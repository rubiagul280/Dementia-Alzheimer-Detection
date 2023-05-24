/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../assets/colors/Colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hangman</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 20,
    marginTop: 30,
  },
});
