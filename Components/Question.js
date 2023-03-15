/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Question = ({ question, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View>
      <Text>{question}</Text>
      {options.map((option) => (
        <Button
          key={option}
          title={option}
          onPress={() => handleSelectOption(option)}
          disabled={selectedOption !== null && selectedOption !== option}
        />
      ))}
      {selectedOption === 'Other' && (
        <TextInput
          placeholder="Please specify"
          onChangeText={(text) => onSelect(text)}
        />
      )}
    </View>
  );
};

export default Question;