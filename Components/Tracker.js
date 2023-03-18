/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Tracker({navigation}) {
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
      color: colors.heading,
      fontSize: 16,
    },
  };
  return (
    <>
      <StatusBar animated={true} backgroundColor="#fff" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={20}
              color={colors.background}
              onPress={() => navigation.navigate('Tabs')}
              style={{marginTop: 3}}
            />
            <Text style={styles.heading}>My Health Care</Text>
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
          <View>
            <Text style={styles.title}>Your Assessments</Text>
            <Card style={styles.card}>
              <Card.Cover
                source={require('../assets/images/assessment_icon.png')}
              />
              <Card.Title title="Keep Tracking!" />
              <Card.Content>
                <Text variant="bodyMedium">
                  Complete your health assessment to track how you've been
                  feeling recently. Tracking often may help you to better
                  understand your symmptoms
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Assessment')}>
                  <Button mode="contained" style={styles.button}>
                    Get Started
                  </Button>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>

          <View>
            <Text style={styles.title}>Your Treatments</Text>
            <Card style={styles.card}>
              <Card.Cover source={require('../assets/images/treatments.png')} />
              <Card.Title title="You haven't added any treatments yet" />
              <Card.Content>
                <Text variant="bodyMedium">
                  Enter your medications and other treatments to help you better
                  understand how they may be impacting your health
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddMedication')}>
                  <Button mode="contained" style={styles.button}>
                    Add Your Treatments
                  </Button>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          </View>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 75,
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
  button: {
    marginTop: 28,
    width: 260,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.background,
    fontSize: 18,
    marginTop: 30,
    marginLeft: 6,
    marginBottom: 10,
  },
  calendarStrip: {
    width: '100%',
    height: 140,
    marginTop: 40,
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
});
