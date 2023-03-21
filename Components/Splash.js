/* eslint-disable prettier/prettier */

import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Image} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/Colors';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <>
    <StatusBar animated={true} backgroundColor="#290438" />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#290438', '#6B218E']}
        style={styles.container}>
        <View>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 70,
    alignItems: 'center',
  },
  text: {
    color: colors.heading,
    padding: 15,
    fontSize: 20,
    alignItems: 'center',
  },
});

export default Splash;
