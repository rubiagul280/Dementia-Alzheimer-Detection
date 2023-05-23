/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    StyleSheet,
    ImageBackground,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/Colors';
import { BlurView } from '@react-native-community/blur';

export default function MemoryGame({ navigation }) {
    const levels = [
        { name: 'Easy', pairs: 4, timeLimit: 25 },
        { name: 'Medium', pairs: 7, timeLimit: 100 },
        { name: 'Hard', pairs: 10, timeLimit: 180 },
    ];

    const [selectedLevel, setSelectedLevel] = useState(null);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (gameStarted && selectedLevel) {
            generateCards();
            startTimer();
        } else {
            stopTimer();
        }
    }, [selectedLevel, gameStarted]);

    useEffect(() => {
        if (timer === 0) {
            stopTimer();
            handleTimeCompletion();
        }
    }, [timer]);

    const generateCards = () => {
        if (!selectedLevel || !selectedLevel.hasOwnProperty('pairs')) {
            return;
        }
        const symbols = [
            require('../assets/images/image1.jpg'),
            require('../assets/images/image2.jpg'),
            require('../assets/images/image3.jpg'),
            require('../assets/images/image4.jpg'),
            require('../assets/images/image5.jpg'),
            require('../assets/images/image6.jpg'),
            require('../assets/images/image7.jpg'),
            require('../assets/images/image8.jpg'),
            require('../assets/images/image9.jpg'),
            require('../assets/images/image10.jpg'),
        ];
        const selectedSymbols = symbols.slice(0, selectedLevel.pairs);
        const allCards = selectedSymbols.concat(selectedSymbols);
        const shuffledCards = allCards.sort(() => 0.5 - Math.random());
        setCards(shuffledCards);
    };

    const flipCard = index => {
        if (
            flippedCards.length < 2 &&
            !flippedCards.includes(index) &&
            !matchedCards.includes(index)
        ) {
            const newFlippedCards = [...flippedCards, index];
            setFlippedCards(newFlippedCards);

            if (newFlippedCards.length === 2) {
                setTimeout(() => checkForMatch(newFlippedCards), 1000);
            }
        }
    };

    const checkForMatch = flippedCards => {
        const [firstCardIndex, secondCardIndex] = flippedCards;
        if (cards[firstCardIndex] === cards[secondCardIndex]) {
            setMatchedCards([...matchedCards, firstCardIndex, secondCardIndex]);
        }
        setFlippedCards([]);
        setMoves(prevMoves => prevMoves + 1);
    };

    const resetGame = () => {
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setGameStarted(false);
        setTimer(selectedLevel ? selectedLevel.timeLimit : 0);
    };

    const startGame = level => {
        setSelectedLevel(level);
        setGameStarted(true);
        setTimer(level.timeLimit);
        setMoves(0);
    };

    const renderCards = () => {
        if (!gameStarted || !selectedLevel) {
            return null;
        }

        return cards.map((imageSource, index) => {
            const isFlipped = flippedCards.includes(index);
            const isMatched = matchedCards.includes(index);
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => flipCard(index)}
                    style={[
                        styles.card,
                        isFlipped || isMatched ? styles.flippedCard : null,
                    ]}
                    disabled={isFlipped || isMatched}>
                    <View style={styles.cardContainer}>
                        {isFlipped || isMatched ? (
                            <Image source={imageSource} style={styles.cardImage} />
                        ) : (
                            <Image
                                source={require('../assets/images/card-back2.png')}
                                style={styles.cardBackImage}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            );
        });
    };

    const renderLevelButtons = () => {
        if (gameStarted) {
            return null;
        }

        return levels.map((level, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => startGame(level)}
                style={[
                    styles.levelButton,
                    level === selectedLevel ? styles.selectedLevelButton : null,
                ]}>
                <Text style={styles.levelButtonText}>{level.name}</Text>
            </TouchableOpacity>
        ));
    };

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleTimeCompletion = () => {
        if (selectedLevel) {
            if (matchedCards.length === selectedLevel.pairs * 2) {
                if (selectedLevel === levels[levels.length - 1]) {
                    showCongratulations(
                        'Congratulations!',
                        'You have completed all levels!',
                    );
                } else {
                    const levelIndex = levels.findIndex(level => level === selectedLevel);
                    const nextLevel = levels[levelIndex.length + 1];
                    showCongratulations(
                        'Congratulations!',
                        `You have completed the ${selectedLevel.name} level!`,
                        nextLevel,
                    );
                }
            } else {
                if (timer !== 0) {
                    showCongratulations(
                        'Congratulations!',
                        'You have completed the level before time!',
                    );
                } else {
                    showFailure(
                        'Time Up!',
                        'You have run out of time. Please try again.',
                    );
                }
            }
            resetGame();
        }
    };

    const showCongratulations = (title, message, nextLevel) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (nextLevel) {
                            startGame(nextLevel);
                        } else {
                            resetGame();
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const showFailure = (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        resetGame();
                    },
                },
            ],
            { cancelable: false },
        );
    };

    const startTimer = () => {
        stopTimer();
        if (selectedLevel) {
            timerRef.current = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    return (
        <>
         <StatusBar translucent backgroundColor="transparent" />
        <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#B8BDF5', '#E8F1F2', '#BBEEEA']}
            style={styles.container}
        >
            <ImageBackground
                source={require('../assets/images/hangman.jpg')}
                style={styles.imageBackground}
                imageStyle={styles.backgroundImage}
            >
                <BlurView
                    style={styles.blurView}
                    blurType="extraLight"
                    blurAmount={1}
                    reducedTransparencyFallbackColor="white"
                >
                    <ScrollView>
                        <View style={styles.container}>
                            <Text style={styles.header}>SELECT LEVEL</Text>
                            {gameStarted && selectedLevel && (
                                <Text style={styles.timerText}>{formatTime(timer)}</Text>
                            )}
                            {gameStarted && selectedLevel && (
                                <Text style={styles.movesText}>Moves: {moves}</Text>
                            )}
                            <View style={styles.levelButtonsContainer}>{renderLevelButtons()}</View>
                            <View style={styles.cardsContainer}>{renderCards()}</View>
                            {gameStarted && selectedLevel && (
                                <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
                                    <Text style={styles.resetButtonText}>Reset Game</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </BlurView>
            </ImageBackground>
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        color: 'white',
        marginTop: 150,
        marginBottom: 50,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 1,
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    movesText: {
        fontSize: 20,
        marginBottom: 20,
    },
    levelButtonsContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        alignSelf: 'center',
    },
    levelButton: {
        padding: 10,
        marginHorizontal: 10,
        width: 200,
        height: 50,
        backgroundColor: colors.heading,
        borderRadius: 30,
        alignItems: 'center',
        paddingTop: 12,
        marginBottom: 20,
        marginTop: 10,
    },
    selectedLevelButton: {
        backgroundColor: 'gray',
    },
    levelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 120,
        margin: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flippedCard: {
        backgroundColor: 'white',
    },
    cardContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {
        width: 80,
        height: 110,
        resizeMode: 'contain',
    },
    cardBackImage: {
        width: 80,
        height: 120,
        resizeMode: 'contain',
        tintColor: '#fff',
        borderRadius: 5,
    },
    resetButton: {
        marginTop: 28,
        width: 300,
        height: 50,
        backgroundColor: colors.heading,
        borderRadius: 36,
        alignItems: 'center',
        paddingTop: 4,
        marginBottom: 20,
    },
    resetButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingTop: 10,
    },
});

