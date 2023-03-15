/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput, List, ProgressBar} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Question from './Question';
import firestore from '@react-native-firebase/firestore';

export default function AddMedicine({navigation}) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Fetch the questions from the Firebase Firestore
    firestore
      .collection('questions')
      .get()
      .then(querySnapshot => {
        const fetchedQuestions = [];
        querySnapshot.forEach(doc => {
          fetchedQuestions.push(doc.data());
        });
        setQuestions(fetchedQuestions);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelectOption = (questionId, option) => {
    const updatedAnswers = {...answers};
    updatedAnswers[questionId] = option;
    setAnswers(updatedAnswers);
    const nextQuestionIndex = questions.findIndex(
      question => question.id === questionId && question.options[option],
    );
    if (nextQuestionIndex !== -1) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleSubmit = () => {
    firestore
      .collection('answers')
      .add(answers)
      .then(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Question
        question={questions[currentQuestionIndex].question}
        options={Object.keys(questions[currentQuestionIndex].options)}
        onSelect={option =>
          handleSelectOption(
            questions[currentQuestionIndex].id,
            option === 'Other' ? '' : option,
          )
        }
      />
      {currentQuestionIndex === questions.length - 1 && (
        <Button title="Submit" onPress={handleSubmit} disabled={!answers} />
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
});
