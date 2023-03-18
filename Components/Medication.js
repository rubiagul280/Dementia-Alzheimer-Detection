/* eslint-disable prettier/prettier */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import colors from '../assets/colors/Colors';
import {Provider, Text} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FloatingAction} from 'react-native-floating-action';

export default function Medication({navigation}) {

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

  const actions = [
    {
      text: 'Add Medication',
      name: 'AddMedication',
      icon: <Fontisto name="pills" size={20} color="#B8BDF5" />,
      position: 1,
      buttonColor: colors.heading,
    },
    {
      text: 'Add Tracking Entry',
      icon: <MaterialIcons name="track-changes" size={20} color="#B8BDF5" />,
      position: 2,
      name: 'track',
    },
    {
      text: 'Add Dose',
      icon: <Entypo name="home" size={20} color="#B8BDF5" />,
      position: 3,
      name: 'dose',
    },
  ];

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
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={styles.animation}
            style={styles.calendar}
            calendarHeaderStyle={{color: colors.secondary}}
            calendarColor={'#E6E6E6'}
            //dateNumberStyle={{color: colors.greytxt}}
            dateNameStyle={colors.greytxt}
            highlightDateNumberStyle={colors.secondary}
            highlightDateNameStyle={colors.secondary}
            disabledDateNameStyle={colors.greytxt}
            disabledDateNumberStyle={colors.greytxt}
            datesWhitelist={datesWhitelist}
            iconContainer={{flex: 0.1}}
            dateNumberStyle={dateStyles.dateNumberStyle}
            // highlightDateNumberStyle={dateStyles.highlightDateNumberStyle}
            startingDate={currentDate}
          />
        </View>
        <View style={styles.content}>
          <FloatingAction
            actions={actions}
            color={colors.heading}
            floatingIcon={<Entypo name="plus" size={20} color="#fff" />}
            iconHeight={24}
            iconWidth={24}
            position="right"
            distanceToEdge={16}
            onPressItem={name => navigation.navigate({name})}
            style={styles.fab}
            overlayColor={null}
          />
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
    marginTop: 5,
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
    padding: 40,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 400,
  },
  button: {
    marginTop: 20,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    marginLeft: 10,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  fab: {
    flex: 1,
    marginTop: 100,
  },
});
