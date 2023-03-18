/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

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
  // {
  //   id: 11,
  //   question: 'Set treatment duration?',
  //   type: 'duration',
  //   startLabel: 'Start date',
  //   endLabel: 'End date',
  // },
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


const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');

  const handleInputChange = (text) => {
    setAnswer(text);
  };

  const handleOptionSelect = (option) => {
    setAnswer(option);
    const nextQuestion = getNextQuestion(currentQuestion.id, option);
    setCurrentQuestion(nextQuestion);
  };

  const getNextQuestion = (currentQuestionId, option) => {
    if (currentQuestionId === 5) {
      if (option === 'Yes') {
        return questions.find((q) => q.id === 6);
      } else {
        return questions.find((q) => q.id === 7);
      }
    } else {
      return questions.find((q) => q.id === currentQuestionId + 1);
    }
  };

  const renderInputQuestion = () => {
    return (
      <View>
        <Text>{currentQuestion.question}</Text>
        <TextInput
          value={answer}
          onChangeText={handleInputChange}
          placeholder="Enter your answer"
        />
        <TouchableOpacity onPress={handleNext}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const handleNext = () => {
  //   const nextQuestion = getNextQuestion(currentQuestion.id, answer);
  //   setCurrentQuestion(nextQuestion);
  //   setAnswer('');
  // };

  const renderListQuestion = () => {
    return (
      <View>
        <Text>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleOptionSelect(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleNext = () => {
    const nextQuestion = getNextQuestion(currentQuestion.id, answer);
    setCurrentQuestion(nextQuestion);
    setAnswer('');
  };

};

export default Question;
