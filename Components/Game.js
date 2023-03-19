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
      <StatusBar animated={true} backgroundColor={colors.game} />
      <View style={styles.container}>
        <View>
          <Image source={require('../assets/images/jigsaw.jpg')} />
        </View>
        <View style={{marginTop: 30}}>
          <Image source={require('../assets/images/game.jpg')} />
        </View>
        <TouchableOpacity>
          <Button mode="contained" style={styles.button}>
            Play
          </Button>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.game,
  },
  button: {
    marginTop: 40,
    marginLeft: 80,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
});
