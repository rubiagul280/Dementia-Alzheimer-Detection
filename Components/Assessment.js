/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, ProgressBar, List, Divider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../assets/colors/Colors';
import firestore from '@react-native-firebase/firestore';

const questions = [
  {
    id: 1,
    question:
      'Have you lost your memory completely about a certain period of time or lost the ability to forma a new memories?',
  },
  {
    id: 2,
    question:
      'Do you feel unsure about where you are, what time it is, or who you are?',
  },
  {
    id: 3,
    question:
      'Have you become worryingly confused or less alert within the past hours or days ',
  },
  {
    id: 4,
    question: 'Have you been told that you are behaving oddly?',
  },
  {
    id: 5,
    question:
      'Did you suffer a head or neck injury before your symptom occured?',
  },
  {
    id: 6,
    question:
      'Have you consumed a large amount of alcohol within the last 24 hours?',
  },
  {
    id: 7,
    question: 'Do you have a headache?',
  },
  {
    id: 8,
    question: 'Are you having keeping your balancing?',
  },
  {
    id: 9,
    question: 'Have you recently completely lost consciousness?',
  },
  {
    id: 10,
    question:
      'Do you have severe difficulty concentrating or get very easily distracted?',
  },
  {
    id: 11,
    question: 'How are your symptoms changing overtime?',
  },
];

export default function Assessment({navigation}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = answer => {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = () => {
    firestore()
      .collection('Assessment')
      .add({
        questions: questions.map(q => q.question),
        answers: answers,
      })
      .then(() => {
        navigation.navigate('Tabs');
      });

  };

  const renderQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      return renderResult();
    }

    const question = questions[currentQuestionIndex];

    return (
      <>
        <StatusBar animated={true} backgroundColor={colors.background} barStyle="light-content"/>
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={18}
              color="#fff"
              onPress={() => navigation.navigate('Tabs')}
            />
            <Text style={styles.heading}>Health Assessment</Text>
          </View>
          <Text style={styles.question}>{question.question}</Text>
          <ProgressBar
            progress={currentQuestionIndex / questions.length}
            style={styles.progress}
          />
          <View style={styles.form}>
            <List.Section>
              <TouchableOpacity onPress={() => handleAnswer('yes')}>
                <List.Item style={styles.list} title="Yes" />
                <Divider />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAnswer('No')}>
                <List.Item title="No" />
                <Divider />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAnswer('I dont Know')}>
                <List.Item title="I dont know" />
                <Divider />
              </TouchableOpacity>
            </List.Section>
          </View>
        </View>
      </>
    );
  };

  const renderResult = () => {
    const numYesAnswers = answers.filter(answer => answer === 'yes').length;

    if (numYesAnswers >= 7) {
      return (
        <View style={styles.result}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.text}>
            You may have severe Alzheimer disease. You need to go to doctor for
            proper treatment
          </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Button mode="contained" style={styles.button}>
              Done
            </Button>
          </TouchableOpacity>
        </View>
      );
    } else if (numYesAnswers <= 5) {
      return (
        <View style={styles.result}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.text}>
            Your memory appears to be functioning normally.
          </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Button mode="contained" style={styles.button}>
              Done
            </Button>
          </TouchableOpacity>
        </View>
      );
    } else if (numYesAnswers === 6 || numYesAnswers === 7) {
      return (
        <View style={styles.result}>
          <Text style={styles.title}>Result</Text>
          <Text style={styles.text}>
            Your may have mild dementia Check our recommendations to take care
            of your brain fucntions.
          </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Button mode="contained" style={styles.button}>
              Done
            </Button>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return <View style={styles.container}>{renderQuestion()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    marginLeft: -90,
    marginTop: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 70,
  },
  question: {
    fontSize: 17,
    marginBottom: 30,
    color: '#fff',
    marginTop: 50,
    padding: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  progress: {
    height: 5,
    width: 300,
  },
  list: {
    width: 300,
    fontSize: 18,
    borderRadius: 5,
    overlayColor: colors.secondary,
    backgroundColor: 'transparent',
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    width: 350,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    marginTop: 85,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
});
