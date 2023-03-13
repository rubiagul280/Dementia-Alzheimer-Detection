/* eslint-disable prettier/prettier */

import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Divider, Text} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../assets/colors/Colors';

export default function Profile({navigation}) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [update, setupdate] = useState('');
  const [press, setPress] = useState(true);
  const [press1, setPress1] = useState(true);
  const [press2, setPress2] = useState(true);

  //const { username } = route.params;
  useEffect(() => {
    setEmail(auth().currentUser.email);
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        console.log(documentSnapshot.data());
        if (documentSnapshot.exists) {
          setName(documentSnapshot.data().username);
          setPassword(documentSnapshot.data().password);
        }
      });
  }, [update]);

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="left" size={20} color={colors.background}
          onPress={() => navigation.navigate('Settings')}/>
          <Text style={styles.heading}>User Profile</Text>
        </View>
        <Divider/>

        <View style={styles.profile}>
          <TouchableOpacity>
            <MaterialIcons
              name="person"
              size={150}
              color="#02AABD"
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

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
                placeholderTextColor={colors.greytxt}
                style={styles.input}
              />
              <TouchableOpacity>
                <MaterialIcons
                  name={press1 ? 'edit' : 'done'}
                  style={styles.icon}
                  size={20}
                  color={colors.background}
                  onPress={async () => {
                    setPress(!press);
                    await firestore()
                      .collection('users')
                      .doc(auth().currentUser.id)
                      .update({username: Name});
                  }}
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
                  name={press ? 'edit' : 'done'}
                  style={styles.icon}
                  size={20}
                  color={colors.background}
                  onPress={async () => {
                    setPress(!press);
                    await firestore()
                      .collection('users')
                      .doc(auth().currentUser.uid)
                      .update({email: Email});
                  }}
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
            <View style={styles.frame}>
              <Text style={styles.text}>Change Password</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Button mode="contained" style={styles.button}>
              Save
            </Button>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 90,
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
    marginTop: 150,
  },
  frame: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  divider: {
    marginBottom: 20,
  },
  text:{
    color: colors.background,
    marginLeft: 5,
  },
});
