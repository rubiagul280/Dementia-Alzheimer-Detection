/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import colors from '../assets/colors/Colors';
import { Provider, Text, Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Medication({ navigation }) {
  const [medications, setMedications] = useState([]);

  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(7, 'days'),
    },
  ];

  const currentDate = new Date();

  const dateStyles = {
    dateNumberStyle: {
      color: '#555',
      fontSize: 16,
    },
    highlightDateNumberStyle: {
      color: colors.secondary,
      fontSize: 16,
    },
  };


  useEffect(() => {
    const subscriber = firestore()
      .collection('Medication')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setMedications(data);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handleDelete = id => {
    firestore()
      .collection('Medication')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Medication deleted!');
      });
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={20}
            color={colors.background}
            onPress={() => navigation.navigate('Tabs')}
          />
          <Text style={styles.heading}>Track your medication</Text>
        </View>
        <View style={styles.calendarStrip}>
          <CalendarStrip
            calendarAnimation={{ type: 'sequence', duration: 30 }}
            daySelectionAnimation={styles.animation}
            style={styles.calendar}
            calendarHeaderStyle={{ color: colors.secondary }}
            calendarColor={'#E6E6E6'}
            dateNameStyle={colors.greytxt}
            highlightDateNumberStyle={colors.secondary}
            highlightDateNameStyle={colors.secondary}
            disabledDateNameStyle={colors.greytxt}
            disabledDateNumberStyle={colors.greytxt}
            datesWhitelist={datesWhitelist}
            iconContainer={{ flex: 0.1 }}
            dateNumberStyle={dateStyles.dateNumberStyle}
            startingDate={currentDate}
          />
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={medications}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.details}>
                <View style={styles.medicine}>
                  <Text style={styles.name}>{item.MedicationName}</Text>
                  <Text style={styles.form}>{item.MedicationForm}</Text>
                  <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <MaterialIcons
                      name="date-range"
                      size={18}
                      color={colors.background}
                    />
                    <Text style={{ marginLeft: 10 }}>
                      Start: {medications.length > 0 && medications[0].MedStartDate.toDate().toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                      name="date-range"
                      size={18}
                      color={colors.background}
                    />
                    <Text style={{ marginLeft: 10 }}>
                      End: {medications.length > 0 && medications[0].MedEndDate.toDate().toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <MaterialCommunityIcons
                      name={'delete-outline'}
                      size={23}
                      color={colors.background}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMedication')}>
            <Button mode="contained" style={styles.button}>
              Add Medication
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 0,
    marginBottom: 30,
    marginTop: 40,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 50,
    marginTop: -3,
  },
  calendarStrip: {
    width: '100%',
    height: 140,
  },
  calendar: {
    height: 120,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 10,
    borderRadius: 5,
    padding: 4,
  },
  animation: {
    type: 'border',
    duration: 200,
    borderWidth: 1,
    borderHighlightColor: colors.secondary,
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 25,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    marginLeft: 10,
    position: 'absolute',
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  fab: {
    flex: 1,
    marginTop: 100,
  },
  flatlist: {
    marginTop: 15,
    height: 370,
    width: '100%',
  },
  details: {
    marginTop: 5,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: '#D4F3F1',
  },
  medicine: {
    width: '94%',
  },
  name: {
    color: colors.background,
    fontSize: 20,
    marginBottom: 10,
  },
  form: {
    color: colors.greytxt,
    fontSize: 16,
    marginBottom: 10,
  },
});
