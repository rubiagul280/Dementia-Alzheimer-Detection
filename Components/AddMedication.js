/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, Divider } from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import notifee, { TriggerType, RepeatFrequency, EventType } from '@notifee/react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddMedication({ navigation }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [medName, setMedName] = useState('');
  const [medform, setMedForm] = useState('Pill');
  const [days, setDays] = useState('As needed');
  const [units, setUnits] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [reminderTimes, setReminderTimes] = useState([]);

  const handleStartDateChange = (event, date) => {
    setStartDate(date || startDate);
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, date) => {
    setEndDate(date || endDate);
    setShowEndDatePicker(false);
  };

  const showStartDatePickerModal = () => setShowStartDatePicker(true);

  const showEndDatePickerModal = () => setShowEndDatePicker(true);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setReminderTimes((prevTimes) => [...prevTimes, date]);
    hideTimePicker();
  };

  useEffect(() => {
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        // Handle notification press event here
        console.log('Notification pressed:', detail.notification);
      }
    });

    // Create the notification channel
    const channel = {
      id: 'medication',
      name: 'Medication Channel',
    };
    notifee.createChannel(channel);

    return () => {
      unsubscribeForegroundEvent();
    };
  }, []);

  const createTriggerNotification = async () => {
    if (!medName || reminderTimes.length === 0) {
      console.log('Please enter medication name and set at least one reminder time');
      return;
    }

    const triggers = [];
    for (const time of reminderTimes) {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: time.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
        repeatInterval: 1,
      };
      triggers.push(trigger);
    }

    for (const trigger of triggers) {
      await notifee.createTriggerNotification(
        {
          title: 'Medication Reminder',
          body: `Time to take your ${medName}`,
          android: {
            channelId: 'medication',
          },
        },
        trigger
      );
    }
  };

  const handleSave = async () => {
    try {
      if (medName.length !== 0 && units !== 0 && reminderTimes.length !== 0) {
        const currentUser = auth().currentUser;
        const { uid } = currentUser;
        const medicationRef = firestore().collection('Medication');

        await medicationRef.add({
          userId: uid,
          MedicationName: medName,
          MedicationForm: medform,
          MedicationDays: days,
          MedicationUnits: units,
          MedStartDate: startDate,
          MedEndDate: endDate,
          MedReminder: reminderTimes,
        });

        // Call the createTriggerNotification function here
        await createTriggerNotification();

        navigation.navigate('Medication');
      } else {
        Alert.alert('Fill all the medication fields');
      }
    } catch (err) {
      Alert.alert('Alert', 'There was an error occurring');
      console.log('Error', err);
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
              size={18}
              color={colors.background}
              onPress={() => navigation.navigate('Medication')}
              style={{ marginTop: 4 }}
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
            <TextInput
              style={styles.input}
              value={medName}
              onChangeText={setMedName}
            />
            <Text style={styles.question}>What form is the medicine?</Text>
            <Picker
              style={styles.list}
              selectedValue={medform}
              onValueChange={(itemValue, itemIndex) => setMedForm(itemValue)}>
              <Picker.Item label="Pill" value="Pill" />
              <Picker.Item label="Solution" value="Solution" />
              <Picker.Item label="Injection" value="Injection" />
              <Picker.Item label="Powder" value="Powder" />
              <Picker.Item label="Drops" value="Drops" />
              <Picker.Item label="Inhaler" value="Inhaler" />
            </Picker>
            <Divider style={styles.list} />
            <Text style={styles.question}>
              How often are you taking this medication?
            </Text>
            <Picker
              selectedValue={days}
              onValueChange={(itemValue, itemIndex) => setDays(itemValue)}>
              <Picker.Item label="As needed" value="As needed" />
              <Picker.Item label="Once a day" value="Once a day" />
              <Picker.Item label="Twice a day" value="Twice a day" />
              <Picker.Item label="Three times a day" value="Three times a day" />
              <Picker.Item label="Once a week" value="Once a week" />
              <Picker.Item label="Twice a week" value="Twice a week" />
              <Picker.Item label="Once a month" value="Once a month" />
            </Picker>
            <Divider style={styles.list} />
            <Text style={styles.question}>
              How mant units do you take each time?
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={units}
              onChangeText={setUnits}
            />
            <Text style={styles.question}>Medication duration?</Text>

            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  marginRight: 30,
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <Text style={{ marginRight: 40 }}>Start Date: </Text>
                <TouchableOpacity
                  onPress={showStartDatePickerModal}
                  style={{ marginRight: 10 }}>
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

              <View style={{ marginRight: 30, flexDirection: 'row' }}>
                <Text style={{ marginRight: 40 }}>End Date: </Text>
                <TouchableOpacity
                  onPress={showEndDatePickerModal}
                  style={{ marginRight: 10 }}>
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
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  marginBottom: 4,
                  color: colors.greytxt,
                }}>
                After set time click on set reminder button
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}>
                  <Icon name="reminder" size={30} color={colors.background} />
                </TouchableOpacity>
                <TouchableOpacity onPress={showTimePicker}>
                  <Text style={{ marginLeft: 20, fontSize: 16, marginTop: 4 }}>
                    Set Reminder Time
                  </Text>
                </TouchableOpacity>
                {/* {reminderTimes.map((time, index) => (
                  <View key={index}>
                    <TextInput value={time.toLocaleTimeString()} editable={false} />
                  </View>
                ))} */}
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSave();
              }}>
              <Button mode="contained" style={styles.button}>
                Save
              </Button>
            </TouchableOpacity>
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
    marginTop: 40,
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
    borderWidth: 0.25,
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
