/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Setting({navigation}) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDeleteAccount = () => {
    const user = auth().currentUser;

    user
      .delete()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
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
            onPress={() => navigation.navigate('Tabs')}
            style={{marginTop: 3}}
          />
           <Text style={styles.heading}>Settings</Text>
        </View>
          <View style={styles.content}>
            <List.Section title={'Account Settings'}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <List.Item
                  title="Profile"
                  left={() => (
                    <Icons name="person" size={22} color={colors.background} />
                  )}
                  right={() => (
                    <List.Icon icon="arrow-right" color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                <List.Item
                  title="Privacy and notifications"
                  left={() => (
                    <Icons name="person" size={22} color={colors.background} />
                  )}
                  right={() => (
                    <List.Icon icon="arrow-right" color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>
            </List.Section>

            <List.Section title={'Support'} style={styles.root}>
              <TouchableOpacity onPress={() => navigation.navigate('Feedback')}>
                <List.Item
                  title="Feedback"
                  left={() => (
                    <Icon name="feedback" size={25} color={colors.background} />
                  )}
                  right={() => (
                    <List.Icon icon="arrow-right" color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Theme')}>
                <List.Item
                  title="Theme"
                  left={() => (
                    <MaterialCommunityIcon
                      name="theme-light-dark"
                      size={25}
                      color={colors.background}
                    />
                  )}
                  right={() => (
                    <List.Icon icon="arrow-right" color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDeleteAccount}>
                <List.Item
                  title="Delete account"
                  left={() => (
                    <Icons name="person" size={22} color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <List.Item
                  title="Logout"
                  left={() => (
                    <Icon name="logout" size={22} color={colors.background} />
                  )}
                />
                <Divider/>
              </TouchableOpacity>
            </List.Section>
          </View>

      </View>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: -120,
    marginBottom: 30,
    marginTop: 20,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 100,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: colors.background,
    marginTop: 20,
  },
  profile: {
    width: 200,
    height: 200,
    alignContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 246,
    height: 296,
    position: 'absolute',
    borderRadius: 3,
  },
  root: {
    height: 50,
    width: 300,
    marginBottom: 5,
  },
  TextStyle: {
    fontWeight: 600,
    alignContent: 'space-between',
    marginLeft: 15,
    fontSize: 16,
  },
  divider: {
    height: 0.7,
    backgroundColor: colors.greytxt,
  },
  version: {
    fontSize: 14,
    marginTop: 380,
  },
});
