/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput, List, ProgressBar} from 'react-native-paper';
import colors from '../assets/colors/Colors';

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
    type: 'list',
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
    id: 6,
    question: 'How often do you take it?',
    type: 'conditional',
    options: [
      'Once daily',
      'Twice daily',
      '3 times a day',
      '4 times a day',
      '6 times a day',
      'Every 6 hours',
    ],
    condition: answers => answers[0] === 'Yes',
  },
  {
    id: 7,
    question: 'How ofthen do you take it?',
    type: 'list',
    options: [
      'Once a week',
      'Every 2 days',
      '2 days a week',
      '3 days a week',
      'Every 28 days',
      'Every 6 hours',
    ],
    condition: answers => answers[4] === 'No',
  },
];

export default function AddMedication() {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswerInput = text => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleAnswerList = option => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
    handleNextQuestion();
  };

  const renderInputQuestion = () => {
    return (
      <>
        <StatusBar animated={true} backgroundColor="#290438" />
        <View style={styles.container}>
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
              onChangeText={handleAnswerInput}
              style={styles.input}
            />
            {currentQuestionIndex !== questions.length - 1 ? (
              <TouchableOpacity onPress={handleNextQuestion}>
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
                    onPress={() => handleAnswerList(option)}
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
                onPress={handleNextQuestion}
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
    } else if (questions[currentQuestionIndex].type === 'list') {
      return renderListQuestion();
    } else if (currentQuestionIndex.type === 'conditional') {
      const conditionMet = currentQuestionIndex.condition(answers);
      if (conditionMet) {
        return renderInputQuestion();
      } else {
        handleNextQuestion();
        return null;
      }
    }
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
      {/* {currentQuestionIndex !== questions.length - 1 ? (
          <Button
            mode="contained"
            onPress={handleNextQuestion}
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
        )} */}
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
  question: {
    fontSize: 19,
    marginBottom: 30,
    color: '#fff',
    marginTop: 80,
    padding: 5,
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
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
  },
});
