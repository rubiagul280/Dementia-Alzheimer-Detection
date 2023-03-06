/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import colors from './Colors';
import {Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FloatingAction} from 'react-native-floating-action';

export default function Medication({navigation}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(7, 'days'),
    },
  ];

  const actions = [
    {
      text: 'Add Medication',
      name: 'AddMedication',
      icon: require('../assets/add_medication.png'),
      position: 1,
    },
    {
      text: 'Add Tracking Entry',
      icon: <Icon name="home" size={20} color="#B8BDF5" />,
      position: 2,
      name: 'track',
    },
    {
      text: 'Add Dose',
      icon: <Icon name="home" size={20} color="#B8BDF5" />,
      position: 3,
      name: 'dose',
    },
  ];

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.calendarStrip}>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={styles.animation}
            style={styles.calendar}
            calendarHeaderStyle={{color: colors.secondary}}
            calendarColor={'#fff'}
            dateNumberStyle={{color: colors.greytxt}}
            dateNameStyle={{color: colors.greytxt}}
            highlightDateNumberStyle={{color: colors.secondary}}
            highlightDateNameStyle={{color: colors.secondary}}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
            datesWhitelist={datesWhitelist}
            iconContainer={{flex: 0.1}}
          />
        </View>
        <View style={styles.content}>
          <FloatingAction
            actions={actions}
            color= {colors.heading}
            floatingIcon={<Icon name="plus" size={20} color="#fff" />}
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
    backgroundColor: '#E6E6E6',
  },
  calendarStrip: {
    width: '100%',
    height: 140,
  },
  calendar: {
    height: 120,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  animation: {
    type: 'border',
    duration: 200,
    borderWidth: 1,
    borderHighlightColor: 'white',
  },
  content: {
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 300,
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