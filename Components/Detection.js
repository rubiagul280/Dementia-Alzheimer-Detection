/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, Image} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import colors from './Colors';

export default function Detection({navigation}) {
  const [image, setImage] = useState(null);

  const selectImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.uri);
      }
    });
  };

  const OpenGallery = async type => {
    openLibrary();
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Detect your disease</Text>
            <Text>You can upload your MRI image to detect your disease.</Text>
            <View style={styles.frame}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => OpenGallery('Photo')}
                style={styles.btnStyle}>
                <Button mode="contained" style={styles.button}>
                  Upload
                </Button>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={selectImage}>
              <Button mode="contained" style={styles.button}>
                Choose Image
              </Button>
            </TouchableOpacity>
            {image && <Image source={{uri: image}} style={styles.image} />}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 18,
    color: colors.background,
  },
  frame: {
    width: '80%',
    height: 90,
    borderRadius: 2,
    borderColor: colors.background,
    color: colors.heading,
  },
  image: {
    width: 200,
    height: 200,
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
});
