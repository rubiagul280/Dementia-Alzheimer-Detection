/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';
import {Text, Button, TextInput, List, ProgressBar} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const questions = [
  {
    id: 1,
    question: 'What med would you like to add?',
    type: 'input',
  },
  {
    id: 2,
    question: 'What form is the medicine?',
    type: 'list',
    options: ['Pill', 'Solution', 'Injection', 'Powder', 'Drops', 'Inhales'],
  },
  {
    id: 3,
    question: 'Which strength is the medicine?',
    type: 'input',
    options: ['g', 'IU', 'mcg', 'mEq', 'mg'],
  },
  {
    id: 4,
    question: 'What are you taking it for?',
    type: 'input',
  },
  {
    id: 5,
    question: 'Do you need to take this medicine everyday?',
    type: 'list',
    options: ['Yes', 'No', 'Only as needed'],
  },
  {
    //Yes option
    id: 6,
    question: 'How often do you take it?',
    type: 'list',
    options: [
      'Once daily',
      'Twice daily',
      '3 times a day',
      '4 times a day',
      'Every 6 hours',
    ],
  },
  {
    id: 8,
    question: 'At what time of day do you take your first dose??',
    type: 'list',
    options: ['Morning', 'Noon', 'Evening', 'Night'],
  },
  {
    id: 9,
    question: 'When do you need to take the dose?',
    type: 'list',
    options: ['Before meal', 'With meal', 'After meal', 'Before bed'],
    inputType: 'timer',
  },
  //Only as needed
  {
    id: 10,
    question: 'Almost done. Would you like to:',
    type: 'list',
    options: ['Set treatment duration', 'Add Instructions'],
  },
  {
    id: 11,
    question: 'Set treatment duration?',
    type: 'duration',
    startLabel: 'Start date',
    endLabel: 'End date',
  },
  {
    id: 12,
    question: 'Add Instructions',
    type: 'input',
  },

  {
    //No option
    id: 7,
    question: 'How often do you take it?',
    type: 'list',
    options: [
      'Once a week',
      'Every 2 days',
      '2 days a week',
      '3 days a week',
      'Every 28 days',
      'Every 6 hours',
    ],
  },
  {
    id: 13,
    question: 'On which date(s) do you need to take the medicine?',
    type: 'input',
  },
  //Move to qustions 8
];

export default function AddMedication({navigation}) {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);

  };

  const handleInputChange = text => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
    //setAnswers(text);
  };

  const handleOptionSelect = option => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
    handleNext();
    // setAnswers(option);
    // const nextQuestion = getNextQuestion(currentQuestionIndex.id, option);
    // setCurrentQuestionIndex(nextQuestion);
  };


  const renderInputQuestion = () => {
    return (
      <>
        <StatusBar animated={true} backgroundColor="#290438" />
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={20}
              color="#fff"
              onPress={() => navigation.navigate('Medication')}
            />
            <Text style={styles.heading}>Add Medication</Text>
          </View>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>
          <ProgressBar
            progress={currentQuestionIndex / questions.length}
            style={styles.progress}
          />
          <View style={styles.form}>
            <TextInput
              mode="outlined"
              value={answers[currentQuestionIndex]}
              onChangeText={handleInputChange}
              style={styles.input}
            />
            {currentQuestionIndex !== questions.length - 1 ? (
              <TouchableOpacity onPress={handleNext}>
                <Button mode="contained" style={styles.button}>
                  Next
                </Button>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => console.log(answers)}>
                <Button mode="contained" style={styles.button}>
                  Submit
                </Button>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  };

  const renderListQuestion = () => {
    return (
      <>
        <StatusBar animated={true} backgroundColor="#290438" />
        <View style={styles.container}>
          <View style={styles.header}>
            <AntDesign
              name="left"
              size={20}
              color="#fff"
              onPress={() => navigation.navigate('Medication')}
            />
            <Text style={styles.heading}>Add Medication</Text>
          </View>
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
          </Text>
          <ProgressBar
            progress={currentQuestionIndex / questions.length}
            style={styles.progress}
          />
          <View style={styles.form}>
            <List.Section>
              {questions[currentQuestionIndex].options.map(option => {
                return (
                  <List.Item
                    key={option}
                    title={option}
                    value={option}
                    onPress={() => handleOptionSelect(option)}
                    status={
                      answers[currentQuestionIndex] === option
                        ? 'checked'
                        : 'unchecked'
                    }
                    style={styles.list}
                    overlayColor={colors.secondary}
                  />
                );
              })}
            </List.Section>
            {currentQuestionIndex !== questions.length - 1 ? (
              <Button
                mode="contained"
                onPress={handleNext}
                style={styles.button}>
                Next
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => console.log(answers)}
                style={styles.button}>
                Submit
              </Button>
            )}
          </View>
        </View>
      </>
    );
  };

  const renderQuestion = () => {
    if (questions[currentQuestionIndex].type === 'input') {
      return renderInputQuestion();
    } else if (currentQuestionIndex.type === 'list') {
      return renderListQuestion();
    } else {
      return null;
    }
  };


  return (
    <View style={styles.container}>
      {renderQuestion()}
      {currentQuestionIndex !== questions.length - 1 ? (
          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}>
            Next
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => console.log(answers)}
            style={styles.button}>
            Submit
          </Button>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#290438',
  },
  header: {
    flexDirection: 'row',
    marginLeft: -85,
    marginTop: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 80,
  },
  question: {
    fontSize: 19,
    marginBottom: 30,
    color: '#fff',
    marginTop: 60,
    padding: 5,
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  input: {
    marginBottom: 28,
    width: 300,
    marginLeft: 0,
    borderRadius: 8,
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 330,
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
});
