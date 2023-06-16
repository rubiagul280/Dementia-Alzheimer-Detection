/* eslint-disable prettier/prettier */

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import Header from './Header';
import ManFigure from './ManFigure';
import WordBox from './WordBox';
import { WordsArray } from './data';
import InputBox from './InputBox';
import Keyboard from './Keyboard';
import StatusPopup from './StatusPopup';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../assets/colors/Colors';

export default function Index({ navigation }) {
    const [correctLetters, setCorrectLetters] = useState('');
    const [wrongLetters, setWrongLetters] = useState('');
    const [status, setStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const correctWord = WordsArray[currentIndex].answer;

    const storeCorrectLetters = (keyInput) => {
        const ans = correctWord.toUpperCase();
        if (ans.includes(keyInput)) {
            const cl = correctLetters + keyInput;
            setCorrectLetters(cl);
            // check win
            updateStatus(cl);
        } else {
            const wl = wrongLetters + keyInput;
            setWrongLetters(wl);
            if (wl.length > 5) {
                // lost
                setStatus('lost');
            }
        }
    };

    const updateStatus = (cl) => {
        let status = 'win';
        const correctWordArray = Array.from(correctWord.toUpperCase());
        correctWordArray.forEach(letter => {
            if (!cl.includes(letter)) {
                status = '';
            }
        });
        if (status === 'win' && currentIndex === WordsArray.length - 1) {
            setStatus('completed');
            return;
        }
        setStatus(status);
    };

    const handlePopupButton = () => {
        if (status === 'win') {
            // go to next word
            setCurrentIndex(i => i + 1);
        }
        // clear all stored data
        setCorrectLetters('');
        setWrongLetters('');
        setStatus('');
        // replay
        if (status === 'completed') {
            setCurrentIndex(0);
        }
    };

    return (
        <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
            style={styles.conatiner}>
            <View style={styles.name}>
                <Header />
                <View style={styles.row}>
                    <ManFigure wrongWord={wrongLetters.length} />
                    <WordBox wordData={WordsArray[currentIndex]} />
                </View>
                <InputBox correctLetters={correctLetters} answer={correctWord} />
                <Keyboard correctLetters={correctLetters} wrongLetters={wrongLetters} onPress={(input) => storeCorrectLetters(input)} />
                <StatusPopup status={status} onPress={handlePopupButton} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Tabs', { screen: 'Game' })}>
                  <Button mode="contained" style={styles.button}>
                    Exit
                  </Button>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.game,
    },
    name: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginBottom: 50,
      },

});
