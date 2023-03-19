/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Button, TextInput, Divider} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';

export default function AddMedication({navigation}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [medName, setMedName] = useState('');
  const [medform, setMedForm] = useState('Pill');
  const [days, setDays] = useState('As needed');
  const [units, setUnits] = useState('');

  const handleStartDateChange = (event, date) => {
    setStartDate(date || startDate);
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (event, date) => {
    setEndDate(date || endDate);
    setShowEndDatePicker(false);
  };

  const handleReminderTimeChange = (event, time) => {
    if (event.type === 'set') {
      setReminderTime(time || reminderTime);
    }
    setShowTimePicker(false);
  };

  const showStartDatePickerModal = () => setShowStartDatePicker(true);

  const showEndDatePickerModal = () => setShowEndDatePicker(true);

  const showTimePickerModal = () => setShowTimePicker(true);

  const setReminder = () => {
    //const reminderDate = new Date();
    startDate.setHours(startDate.getHours());
    startDate.setMinutes(startDate.getMinutes());
    startDate.setSeconds(0);

    PushNotification.localNotificationSchedule({
      message: 'Take your medication',
      date: startDate,
      repeatType: 'day',
      allowWhileIdle: true,
    });
  };

  const handleSave = async () => {
    try {
      const currentUser = auth().currentUser;
      const { uid } = currentUser;
      const medicationRef = firestore().collection('users').doc(uid).collection('Medication').doc();

      await medicationRef.set({
        MedicationName: medName,
        MedicationForm: medform,
        MedicationDays: days,
        MedicationUnits: units,
        MedStartDate: startDate,
        MedEndDate: endDate,
        MedReminder: reminderTime,
      });
      navigation.navigate('Medication');
    } catch (err){
      Alert.alert('Fill all the medication fields');
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
              <Picker.Item label="Pill" value="option1" />
              <Picker.Item label="Solution" value="option2" />
              <Picker.Item label="Injection" value="option3" />
              <Picker.Item label="Powder" value="option4" />
              <Picker.Item label="Drops" value="option5" />
              <Picker.Item label="Inhaler" value="option6" />
              <Picker.Item label="Once a month" value="option7" />
            </Picker>
            <Divider style={styles.list} />
            <Text style={styles.question}>
              How often are you taking this medication?
            </Text>
            <Picker
              selectedValue={days}
              onValueChange={(itemValue, itemIndex) => setDays(itemValue)}>
              <Picker.Item label="As needed" value="option1" />
              <Picker.Item label="Once a day" value="option2" />
              <Picker.Item label="Twice a day" value="option3" />
              <Picker.Item label="Three times a day" value="option4" />
              <Picker.Item label="Once a week" value="option5" />
              <Picker.Item label="Twice a week" value="option6" />
              <Picker.Item label="Once a month" value="option7" />
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
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 12,
                  marginBottom: 4,
                  color: colors.greytxt,
                }}>
                After set time click on set reminder button
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={showTimePickerModal}
                  style={{flexDirection: 'row'}}>
                  <Icon name="reminder" size={30} color={colors.background} />
                </TouchableOpacity>
                {showTimePicker && (
                  <DateTimePicker
                    value={reminderTime}
                    is24Hour={false}
                    mode="time"
                    display="spinner"
                    onChange={handleReminderTimeChange}
                  />
                )}
                <TouchableOpacity onPress={setReminder}>
                  <Text style={{marginLeft: 20, fontSize: 16, marginTop: 4}}>
                    Set Reminder
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setReminder();
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
