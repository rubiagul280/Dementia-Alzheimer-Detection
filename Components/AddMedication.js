/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Button, TextInput, List, Divider} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import TimePicker from 'react-native-simple-time-picker';

export default function AddMedication({navigation}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleStartDateChange = (event, date) => {
    setStartDate(date || startDate);
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, date) => {
    setEndDate(date || endDate);
    setShowEndDatePicker(false);
  };

  const handleReminderTimeChange = (event, time) => {
    setReminderTime(time || reminderTime);
    setShowTimePicker(false);
  };

  const showStartDatePickerModal = () => setShowStartDatePicker(true);

  const showEndDatePickerModal = () => setShowEndDatePicker(true);

  const showTimePickerModal = () => setShowTimePicker(true);

  const setReminder = () => {
    const reminderDate = new Date();
    reminderDate.setHours(reminderTime.getHours());
    reminderDate.setMinutes(reminderTime.getMinutes());
    reminderDate.setSeconds(0);

    PushNotification.localNotificationSchedule({
      message: 'Take your medication',
      date: reminderDate,
      repeatType: 'day',
      allowWhileIdle: true,
    });
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={18}
              color={colors.background}
              onPress={() => navigation.navigate('Medication')}
              style={{marginTop: 4}}
            />
            <Text style={styles.heading}>Add Medication</Text>
          </View>
          <View>
            <Text style={styles.text}>
              Add your medication detail for reminder
            </Text>
            <Text style={styles.question}>
              What medicine would you like to add?
            </Text>
            <TextInput style={styles.input} />
            <Text style={styles.question}>What form is the medicine?</Text>
            <List.Section>
              <List.Accordion style={styles.list}>
                <List.Item title="Pill" />
                <Divider />
                <List.Item title="Solution" />
                <Divider />
                <List.Item title="Injection" />
                <Divider />
                <List.Item title="Powder" />
                <Divider />
                <List.Item title="Drops" />
                <Divider />
                <List.Item title="Inhaler" />
                <Divider />
              </List.Accordion>
            </List.Section>
            <Text style={styles.question}>
              How often are you taking this medication?
            </Text>
            <List.Section>
              <List.Accordion style={styles.list}>
                <List.Item title="As needed" />
                <Divider />
                <List.Item title="Once a day" />
                <Divider />
                <List.Item title="Twice a day" />
                <Divider />
                <List.Item title="Three times a day" />
                <Divider />
                <List.Item title="Once a week" />
                <Divider />
                <List.Item title="Twice a week" />
                <Divider />
                <List.Item title="Once a month" />
                <Divider />
              </List.Accordion>
            </List.Section>
            <Text style={styles.question}>
              How mant units do you take each time?
            </Text>
            <TextInput style={styles.input} keyboardType="numeric" />
            <Text style={styles.question}>Medication duration?</Text>

            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  marginRight: 30,
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <Text style={{marginRight: 40}}>Start Date: </Text>
                <TouchableOpacity
                  onPress={showStartDatePickerModal}
                  style={{marginRight: 10}}>
                  <AntDesign name="calendar" size={24} />
                </TouchableOpacity>
                <Text>{startDate.toLocaleDateString()}</Text>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                  />
                )}
              </View>

              <View style={{marginRight: 30, flexDirection: 'row'}}>
                <Text style={{marginRight: 40}}>End Date: </Text>
                <TouchableOpacity
                  onPress={showEndDatePickerModal}
                  style={{marginRight: 10}}>
                  <AntDesign name="calendar" size={24} />
                </TouchableOpacity>
                <Text>{endDate.toLocaleDateString()}</Text>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                  />
                )}
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={showTimePickerModal}>
                <Button mode="contained" style={styles.button}>
                  Set Reminder
                </Button>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={endDate}
                  is24Hour={false}
                  mode="time"
                  display="spinner"
                  onChange={handleReminderTimeChange}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 70,
    marginBottom: 20,
  },
  text: {
    color: colors.greytxt,
    marginBottom: 10,
  },
  question: {
    color: colors.background,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'transparent',
  },
  list: {
    borderColor: colors.background,
    borderWidth: 0.5,
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
