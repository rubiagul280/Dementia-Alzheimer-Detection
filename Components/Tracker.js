/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, TextInput, Button, RadioButton } from 'react-native-paper';

export default function Tracker ({navigation}){
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      id: 0,
      question: 'What is your name?',
      input: true,
    },
    {
      id: 1,
      question: 'What is your age?',
      input: true,
    },
    {
      id: 2,
      question: 'Do you like ice cream?',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Maybe', value: 'maybe' },
        { label: 'I am not sure', value: 'unsure' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      id: 3,
      question: 'What flavor of ice cream do you like?',
      input: true,
      showOnAnswer: 'yes',
    },
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers };
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    if (questions[currentQuestion].showOnAnswer) {
      setCurrentQuestion(questions[currentQuestion].showOnAnswer);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const renderQuestion = () => {
    const current = questions[currentQuestion];
    if (current.input) {
      return (
        <View>
          <Text>{current.question}</Text>
          <TextInput
            value={answers[currentQuestion]}
            onChangeText={(value) => handleAnswer(value)}
          />
        </View>
      );
    }
    if (current.options) {
      return (
        <View>
          <Text>{current.question}</Text>
          {current.options.map((option) => (
            <View key={option.value}>
              <RadioButton
                value={option.value}
                status={
                  answers[currentQuestion] === option.value ? 'checked' : 'unchecked'
                }
                onPress={() => handleAnswer(option.value)}
              />
              <Text>{option.label}</Text>
            </View>
          ))}
        </View>
      );
    }
  };

  return (
    <View>
      {renderQuestion()}
      <Button disabled={!answers[currentQuestion]} onPress={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
      <View style={{ flexDirection: 'row' }}>
        {questions.map((_, index) => (
          <View
            key={index}
            style={{
              height: 10,
              width: 10,
              backgroundColor: currentQuestion === index ? 'blue' : 'gray',
              borderRadius: 5,
              margin: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};