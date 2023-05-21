/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */

import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Divider, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import colors from '../assets/colors/Colors';

export default function Profile ({navigation}) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [update, setupdate] = useState('');
  const [press, setPress] = useState(true);
  const [press1, setPress1] = useState(true);
  const [press2, setPress2] = useState(true);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setEmail(auth().currentUser.email);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().username);
          setPassword(documentSnapshot.data().password);
        }
      });
  }, [update]);

  const updateEmail = async newEmail => {
    try {
      const user = auth().currentUser;
      await user.updateEmail(newEmail);
      alert('Email updated successfully!');
    } catch (error) {
      if (error.code === 'auth/user-token-expired') {
        // Handle expired token error
        alert('Your session has expired. Please sign in again.');
      } else {
        // Handle other errors
        alert(error.message);
      }
    }
  };

  const updateName = async () => {
    setPress1(!press1);
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({username: Name});
  };


  const currentUser = auth().currentUser;
  const imageRef = firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('profile')
    .doc('image');

  useEffect(() => {
    // Retrieve the image URL from Firestore and set it as the default value for the `image` state variable
    const unsubscribe = imageRef.onSnapshot(snapshot => {
      const data = snapshot.data();
      if (data && data.url) {
        setImage(data.url);
      }
    });
    return unsubscribe;
  }, []);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleSelectImage = async source => {
    try {
      const croppedImage = await ImagePicker.openCropper({
        path: source.path,
        width: 400,
        height: 400,
      });
      setImage(croppedImage.path);
      await uploadImage(croppedImage.path);
    } catch (error) {
      alert(error);
    }
    setModalVisible(false);
  };

  const handleOpenGallery = async () => {
    try {
      const source = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
      });
      handleSelectImage(source);
    } catch (error) {
      alert(error);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const source = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      });
      handleSelectImage(source);
    } catch (error) {
      alert(error);
    }
  };

  // Upload image to Firebase Storage and update the image URL in Firestore
  const uploadImage = async uri => {
    const storageRef = storage().ref(
      `profile/${currentUser.username}/profilePicture/image.jpg`,
    );
    const task = storageRef.putFile(uri);
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      await imageRef.set({url});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={20}
              color={colors.background}
              onPress={() => navigation.navigate('Settings')}
              style={{marginTop: 3}}
            />
            <Text style={styles.heading}>User Profile</Text>
          </View>
          <Divider />

          <View style={styles.profile}>
            <TouchableOpacity onPress={handlePress}>
              {image ? (
                <>
                  <Image source={{uri: image}} style={styles.personIcon} />
                  <View style={styles.editIcon1}>
                    <MaterialIcons name="camera" size={24} color="#fff" />
                  </View>
                </>
              ) : (
                <>
                  <MaterialIcons
                    name="person"
                    size={150}
                    color="#02AABD"
                    style={styles.image}
                  />
                  <View style={styles.editIcon}>
                    <MaterialIcons name="camera" size={24} color="#fff" />
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* modal  */}
          <Modal visible={modalVisible}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select image from</Text>

              <TouchableOpacity  onPress={handleOpenGallery}>
                <View style={styles.inMod}>
                  <MaterialIcons name="camera" size={25} color={colors.background} style={styles.icon}/>
                  <Text style={styles.inModText}>Gallery</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleOpenCamera}>
                <View style={styles.inMod}>
                  <MaterialIcons name="image" size={25} color={colors.background} style={styles.icon}/>
                  <Text style={styles.inModText}>Take a Photo</Text>
                </View>
              </TouchableOpacity>

              <View>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.content}>
            <View style={styles.data}>
              <MaterialIcons
                name="person"
                size={25}
                color="#02AABD"
                style={styles.image}
              />
              <View style={styles.frame}>
                <TextInput
                  value={Name}
                  onChangeText={setName}
                  placeholder="Name"
                  placeholderTextColor= {colors.background}
                  style={styles.input}
                />
                <TouchableOpacity>
                  <MaterialIcons
                    name={press1 ? 'edit' : 'done'}
                    style={styles.edit1}
                    size={20}
                    color="#02AABD"
                    onPress={updateName}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.data}>
              <MaterialIcons
                name="email"
                size={25}
                color="#02AABD"
                style={styles.image}
              />
              <View style={styles.frame}>
                <TextInput
                  value={Email}
                  onChangeText={setEmail}
                  placeholder="email@gmail.com"
                  placeholderTextColor={colors.greytxt}
                  style={styles.input}
                />
                <TouchableOpacity>
                  <MaterialIcons
                    name={press1 ? 'edit' : 'done'}
                    style={styles.edit1}
                    size={20}
                    color="#02AABD"
                    onPress={updateEmail}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.data}>
              <MaterialIcons
                name="lock"
                size={25}
                color="#02AABD"
                style={styles.image}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('New Password')}>
                <View style={styles.frame}>
                  <Text style={styles.text}>Change Password</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Divider style={styles.divider} />
          </View>
          <TouchableOpacity>
            <Button mode="contained" style={styles.button}>
              Save
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: -110,
    marginBottom: 30,
    marginTop: 20,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 90,
  },
  edit1: {
    paddingLeft: 0,
    color: colors.background,
  },
  profile: {
    height: 170,
    width: 170,
    alignItems: 'center',
    borderRadius: 100,
    paddingBottom: 10,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: colors.background,
  },
  image: {
    color: colors.background,
  },
  content: {
    marginTop: 40,
  },
  data: {
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    marginRight: 15,
  },
  input: {
    color: colors.background,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 36,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.heading,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 130,
  },
  frame: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  divider: {
    marginBottom: 20,
  },
  text: {
    color: colors.background,
    marginLeft: 5,
  },
  personIcon: {
    height: 170,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 100,
    paddingBottom: 10,
    marginBottom: 15,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: colors.background,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
  },
  editIcon1: {
    position: 'absolute',
    bottom: 30,
    right: 2,
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 4,
  },
  modalText: {
    marginBottom: 15,
    paddingTop: 12,
    textAlign: 'center',
    fontWeight: 500,
    color: colors.background,
    fontSize: 18,
  },
  modalView: {
    backgroundColor: colors.modal,
    borderRadius: 5,
    height: '40%',
    width: '90%',
    padding: 10,
    marginLeft: 15,
  },
  inMod: {
    height: 50,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },

  inModText: {
    color: colors.background,
    paddingLeft: '4%',
    paddingBottom: 0,
    fontWeight: 400,
    alignContent: 'space-between',
    marginTop: '3%',
    fontSize: 16,
  },
  icon:{
    marginTop: 7,
  },
  cancel: {
    marginLeft: 200,
    fontSize: 12,
  }
});

