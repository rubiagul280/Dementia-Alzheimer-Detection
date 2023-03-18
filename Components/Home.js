/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Card} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Home({navigation}) {
  const [username, setUsername] = useState('');

  var usercollection = firestore().collection('users');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      // Get the user's email from Firebase
      const email = currentUser.email;

      // Query the Firebase database for the username associated with the email
      usercollection
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const user = doc.data();
            setUsername(user.username);
          });
        });
    }
  }, []);

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B8BDF5" />
      <ScrollView>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
          style={styles.container}>
          <>
            <View>
              <View style={styles.top}>
                <Text style={styles.text}>Hi {username}</Text>
                <Text style={styles.text}>
                  I'm AI Neurologists: Alzheimer Detection. I can help you learn
                  more about your health.
                </Text>
              </View>
              <View>
                <Text style={styles.heading}>Featured</Text>
                <Card
                  style={styles.card}
                  onPress={() => navigation.navigate('About')}>
                  <Card.Cover
                    source={require('../assets/images/feature.png')}
                  />
                </Card>
                <Text
                  style={styles.title}
                  onPress={() => navigation.navigate('Detection')}>
                  How AI Neurologists can help
                </Text>
                <Text style={styles.txt}>
                  Read a quick overview of AI Neurologists features.
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Detection')}>
                  <Button mode="contained" style={styles.button}>
                    Start Checkup
                  </Button>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{marginRight: 30}}>
                  <Text style={styles.heading}>Take care of your health</Text>
                  <Card
                    style={styles.card}
                    onPress={() => navigation.navigate('Medication')}>
                    <Card.Cover
                      source={require('../assets/images/medication_icon.png')}
                    />
                  </Card>
                  <Text
                    style={styles.title}
                    onPress={() => navigation.navigate('Medication')}>
                    Track your treatments
                  </Text>
                  <Text style={styles.txt}>
                    For better health, track your treatment daily.
                  </Text>
                </View>

                <View>
                  <Text style={styles.heading}/>
                  <Card
                    style={styles.card}
                    onPress={() => navigation.navigate('Assessment')}>
                    <Card.Cover
                      source={require('../assets/images/assessment_icon.png')}
                    />
                  </Card>
                  <Text
                    style={styles.title}
                    onPress={() => navigation.navigate('Assessment')}>
                    Check your health assessment
                  </Text>
                  <Text style={styles.txt}>
                    Complete your health assessment for tracking.
                  </Text>
                </View>
                </ScrollView>
              </View>
            </View>
          </>
        </LinearGradient>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  top: {
    marginTop: 20,
  },
  card: {
    margin: 4,
    marginTop: 12,
    marginBottom: 10,
  },
  text: {
    color: colors.background,
    fontSize: 20,
    marginLeft: 6,
  },
  heading: {
    color: colors.background,
    fontSize: 18,
    marginTop: 50,
    marginLeft: 6,
  },
  title: {
    color: colors.background,
    fontSize: 16,
    marginTop: 10,
    marginLeft: 6,
    width: 315,
  },
  txt: {
    fontSize: 13,
    marginTop: 3,
    marginLeft: 6,
  },
  logo: {
    marginTop: 70,
    marginBottom: 18,
    width: 60,
    height: 50,
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
  content: {
    justifyContent: 'center',
  },
});
