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

export default function Setting({navigation}) {
  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
        style={styles.container}>
        <View />
      </LinearGradient>
    </>
  );
}

Setting.navigationOptions = {
  title: 'Settings',
  headerStyle: {
    backgroundColor: 'blue',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
