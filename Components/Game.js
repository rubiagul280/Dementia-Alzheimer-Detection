/* eslint-disable prettier/prettier */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  import LinearGradient from 'react-native-linear-gradient';

  export default function Game({navigation}){
    return (
        <>
        <StatusBar animated={true} backgroundColor="#B8BDF5" />
        <LinearGradient start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#B9B0E5', '#E8F1F2', '#BBEEEA']}
          style={styles.container}>
            <View />
          </LinearGradient>
        </>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
});
