/* eslint-disable prettier/prettier */

import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
              size={27}
              color="#02AABD"
              style={styles.image}
            />
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
                    .doc(auth().currentUser.uid)
                    .update({username: Name});
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.data}>
          <MaterialIcons
              name="person"
              size={27}
              color="#02AABD"
              style={styles.image}
            />
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

          <View style={styles.data}>
          <MaterialIcons
              name="person"
              size={27}
              color="#02AABD"
              style={styles.image}
            />
            <TextInput
              value={Password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.greytxt}
              style={styles.input}
              secureTextEntry={true}
            />
            <TouchableOpacity>
              <MaterialIcons
                name={press2 ? 'edit' : 'done'}
                style={styles.icon}
                size={20}
                color={colors.background}
                onPress={async () => {
                  setPress(!press);
                  await firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .update({password: Password});
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
                <Button mode="contained" style={styles.button}>
                  Save
                </Button>
              </TouchableOpacity>
        </View>
      </View>
      {/* <ScrollView>
        <View style={styles.root}>
          <View style={styles.spacing}>
            <TouchableOpacity>
              <MaterialIcons name="person" size={150} color="#02AABD" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <TextInput
              value={Name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor={'#02AABD'}
              style={styles.input}
            />
            <TouchableOpacity>
              <MaterialIcons
                name={press1 ? 'edit' : 'done'}
                style={styles.edit1}
                size={20}
                color="#02AABD"
                onPress={async () => {
                  setPress(!press);
                  await firestore()
                    .collection('users')
                    .doc(auth().currentUser.uid)
                    .update({username: Name});
                }}
              />
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView> */}
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
  profile: {
    height: 170,
    width: 170,
    justifyContent: 'center',
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
    borderColor: colors.background,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    color: colors.background,
    marginLeft: -170,
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
    marginTop: 160,
  },

});
