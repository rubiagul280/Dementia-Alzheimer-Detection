/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button, Card} from 'react-native-paper';
import PermissionsService, {isIOS} from './Permissions';
import colors from './Colors';
import Entypo from 'react-native-vector-icons/Entypo';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    request.url = configureUrl(config.url);
    return request;
  },
  error => error,
);

export const {height, width} = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const fonts = {
  Bold: {fontFamily: 'Roboto-Bold'},
};

const options = {
  mediaType: 'photo',
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};
export default function Detection ({navigation}){
  const getPredication = async params => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('file', params);
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: bodyFormData,
      });
      const data = await response.json();
      setLabel(data.class);
      setResult(data.confidence);
      console.log(data);
    } catch (error) {
      console.error('Error in getPrediction:', error);
    }
  };

  const manageCamera = async type => {
    openLibrary();
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const getResult = async (path, response) => {
    setImage(path);
    setLabel('Predicting...');
    setResult('');
    const params = {
      uri: path,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };
    const res = await getPredication(params);
    const data = await response.json();
    if (res?.data?.class) {
      setLabel(res.data.class);
      setResult(res.data.confidence);
    } else {
      setLabel(data.class);
      setResult(data.confidence);
    }
  };

  const openLibrary = async () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
        getResult(path, response);
      }
    });
  };

  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');

  return (
    <View style={[styles.outer]}>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Detect your disease</Text>
          <Text style={styles.text}>
            You can detect your disease by uploading MRI image of your brain.
          </Text>
          <View style={styles.frame}>
            <Text style={styles.uptext}>Upload your MRI {'\n'} Image</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => manageCamera('Photo')}>
              <Entypo name="upload" size={45} style={styles.uploadImage}/>
            </TouchableOpacity>
            {(image?.length && (
              <Image source={{uri: image}} style={styles.imageStyle} />
            )) ||
              null}
          </View>
          {result && label && (
              <View style={styles.mainOuter}>
                <Text style={[styles.space, styles.labelText]}>
                  {'Label:  '}
                  <Text style={styles.resultText}>{label}</Text>
                </Text>
                <Text style={[styles.space, styles.labelText]}>
                  {'Confidence:  '}
                  <Text style={styles.resultText}>
                    {parseFloat(result).toFixed(2) + '%'}
                  </Text>
                </Text>
              </View>
            )}
          {/* <TouchableOpacity>
            <Button mode="contained" style={styles.button}>
              Detect
            </Button>
            {result && label && (
              <View style={styles.mainOuter}>
                <Text style={[styles.space, styles.labelText]}>
                  {'Label: \n\n'}
                  <Text style={styles.resultText}>{label}</Text>
                </Text>
                <Text style={[styles.space, styles.labelText]}>
                  {'Confidence: \n\n'}
                  <Text style={styles.resultText}>
                    {parseFloat(result).toFixed(2) + '%'}
                  </Text>
                </Text>
              </View>
            )}
          </TouchableOpacity> */}
          <TouchableOpacity onPress={clearOutput}>
            <Button mode="contained" style={styles.button}>
              Clean
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#fff',
  },
  content: {
    padding: 5,
  },
  heading: {
    color: colors.background,
    fontSize: 26,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 18,
  },
  frame: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 5,
    height: 300,
    width: 250,
    marginTop: 40,
    marginLeft: 30,
    alignItems: 'center',
  },
  imageStyle: {
    width: 246,
    height: 296,
    position: 'absolute',
    borderRadius: 3,
  },
  button: {
    marginTop: 28,
    marginLeft: 60,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
  uploadImage: {
    height: 50,
    width: 50,
    marginTop: 10,
    color: colors.greytxt,
  },
  outer: {
    flex: 1,
  },
  space: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  labelText: {
    color: 'black',
    fontSize: 20,
    ...fonts.Bold,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 20,
    ...fonts.Bold,
    color: 'red',
  },
  uptext: {
    color: colors.greytxt,
    fontSize: 18,
    marginTop: 85,
    marginBottom: 10,
    textAlign: 'center',
  },
  mainOuter: {
    marginTop: 15,
    alignItems: 'center',
  },
  // emptyText: {
  //   position: 'absolute',
  //   top: height / 1.9,
  //   alignSelf: 'center',
  //   color: 'red',
  //   fontSize: 20,
  //   maxWidth: '70%',
  //   ...fonts.Bold,
  // },
});

