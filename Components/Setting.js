/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Setting({navigation}) {
  const [image, setImage] = useState(null);

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

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5"  />
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Icons
            name="md-person-circle"
            size={80}
            color={colors.heading}
            style={styles.image}
          />
          <Text style={styles.name}>Rubia Gulzar</Text>
        </View> */}
        <View style={styles.frame}>
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
            <Text style={styles.text}>Account Settings</Text>
            <View >
              <TouchableOpacity style={styles.root} onPress={() => navigation.navigate('Profile')}>
                <Icons name="person" size={25} color={colors.background} />
                <Text style={styles.TextStyle}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity  style={styles.root} onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Icon name="logout" size={25} color={colors.background} />
                <Text style={styles.TextStyle}> Privacy and notifications</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.text}>Support</Text>

            <View>
              <TouchableOpacity  style={styles.root}>
                <Icon name="feedback" size={25} color={colors.background} />
                <Text style={styles.TextStyle}>Feedback</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity  style={styles.root}>
                <MaterialCommunityIcon name="theme-light-dark" size={25} color={colors.background}/>
                <Text style={styles.TextStyle}>Theme</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.underline}>
              <TouchableOpacity style={styles.root}>
                <Icon name="logout" size={25} color={colors.background}/>
                <Text style={styles.TextStyle}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // header: {
  //   marginTop: 25,
  //   marginBottom: 25,
  //   flexDirection: 'row',
  //   alignContent: 'center',
  // },
  // image: {
  //   backgroundColor: colors.background,
  // },
  // name: {
  //   color: colors.heading,
  //   fontSize: 20,
  //   padding: 25,
  // },
  frame: {
    flex: 1,
    // backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingHorizontal: 25,
    // paddingVertical: 50,
    // paddingTop: 30,
    marginTop: 30,
  },
  text:{
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
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  TextStyle: {
    fontWeight: 600,
    alignContent: 'space-between',
    marginLeft: 15,
    fontSize: 16,
  },

});
