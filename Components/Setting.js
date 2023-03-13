/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import { color } from 'react-native-reanimated';

export default function Setting({navigation}) {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // const back = function () {
  //   navigation.replace('Tabs');
  // };
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity>
  //         <MaterialIcons
  //           name="arrow-back"
  //           size={24}
  //           color="#02AABD"
  //           onPress={back}
  //         />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, back]);

  const manageCamera = async type => {
    pickImage();
  };

  const options = {
    title: 'Select Profile Picture',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const pickImage = () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.uri);
      }
    });
  };

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
        <Text style={styles.heading}>Settings</Text>
        {/* <View style={styles.header}>
          <Icons
            name="md-person-circle"
            size={80}
            color={colors.heading}
            style={styles.image}
          />
          <Text style={styles.name}>Rubia Gulzar</Text>
        </View> */}
          {/* <TouchableOpacity
            activeOpacity={1}
            onPress={() => manageCamera('Photo')}>
            <Icon
              name="person-add"
              size={150}
              color="#B8BDF5"
              style={styles.uploadImage}
            />
          </TouchableOpacity>
          {(image?.length && (
            <Image source={{uri: image}} style={styles.imageStyle} />
          )) ||
            null} */}

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
  heading: {
    color: colors.background,
   fontSize: 18,
   marginTop: 20,
   marginBottom: 10,
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
  }
});
