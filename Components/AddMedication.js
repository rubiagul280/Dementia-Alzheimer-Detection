/* eslint-disable prettier/prettier */

import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {
  Text,
  Button,
  RadioButton,
  TextInput,
  ProgressBar,
} from 'react-native-paper';
import colors from './Colors';

const questions = [
  {
    id: 1,
    question: 'What medicine would you like to add?',
    type: 'text',
  },
  {
    id: 2,
    question: 'What form is this medicine?',
    type: 'radio',
    options: [
      {id: 1, label: 'Pill'},
      {id: 2, label: 'Solution'},
      {id: 3, label: 'Injection'},
      {id: 4, label: 'Powder'},
      {id: 5, label: 'Drops'},
      {id: 6, label: 'Inhales'},
      {id: 7, label: 'Others', options:[
        {id: 1, label: 'By mouth'},
        {id: 2, label: 'Topical (on skin)'},
        {id: 3, label: 'In nose/eyes/ears'},
        {id: 4, label: 'Inhaled'},
        {id: 5, label: 'By Injection'},
      ]},
    ],
  },
  {
    id: 3,
    question: 'What strength is the medicine?',
    type: 'text',
  },
  {
    id: 4,
    question: 'What are you taking it for?',
    type: 'text',
  },
  {
    id: 5,
    question: 'Do you need to take this medicine everyday?',
    type: 'text',
    options: [
      {id: 1, label: 'Yes'},
      {id: 2, label: 'No'},
      {id: 3, label: 'Only as needed'},
    ],
  },
];

export default function AddMedication() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNextQuestion = () => {
    if (Object.keys(answers).length === currentQuestionIndex) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({...answers, [questionId]: answer});
  };

  return (
    <>
      <StatusBar animated={true} backgroundColor="#290438" />
      <View style={styles.container}>
        <Text style={styles.question}>
          {questions[currentQuestionIndex].question}
        </Text>
        <ProgressBar progress={(currentQuestionIndex + 1) / questions.length} style={styles.progress}/>
        <View style={styles.form}>
        {questions[currentQuestionIndex].type === 'radio' && (
          <View>
            {questions[currentQuestionIndex].options.map(option => (
              <View key={option.id} style={styles.radioOption}>
                <RadioButton
                  value={option.label}
                  status={
                    answers[questions[currentQuestionIndex].id] === option.label
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() =>
                    handleAnswerChange(
                      questions[currentQuestionIndex].id,
                      option.label,
                    )
                  }
                />
                <Text>{option.label}</Text>
              </View>
            ))}
          </View>
        )}
        {questions[currentQuestionIndex].type === 'text' && (
            <TextInput
              style={styles.input}
              value={answers[questions[currentQuestionIndex].id] || ''}
              onChangeText={text =>
                handleAnswerChange(questions[currentQuestionIndex].id, text)
              }
            />
          )}
          <TouchableOpacity onPress={handleNextQuestion}>
            <Button mode="contained" style={styles.button}>
              Next
            </Button>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 50,
    paddingTop: 55,
  },
  input: {
    marginBottom: 28,
    width: 300,
    marginLeft: 0,
    borderRadius: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 28,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 36,
    alignItems: 'center',
    paddingTop: 4,
  },
  progress: {
    height: 5,
    width: 300,
  },
});