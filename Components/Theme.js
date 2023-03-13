/* eslint-disable prettier/prettier */

import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {Text, Button} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Theme({navigation}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderRadio = value => (
    <TouchableOpacity
      style={styles.radio}
      onPress={() => setSelectedValue(value)}>
      {selectedValue === value && <View style={styles.selectedRadio} />}
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={20}
            color={colors.background}
            onPress={() => navigation.navigate('Settings')}
          />
          <Text style={styles.heading}>Theme</Text>
        </View>

      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: theme === 'dark' ? '#222' : '#fff',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: -130,
    marginBottom: 30,
    marginTop: 20,
  },
  heading: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 110,
  },
  radioContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: theme === 'dark' ? '#fff' : '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    //backgroundColor: theme === 'dark' ? '#fff' : '#000',
  },
  label: {
    fontSize: 16,
    //color: theme === 'dark' ? '#fff' : '#000',
  },
  toggleButton: {
    //backgroundColor: theme === 'dark' ? '#fff' : '#000',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  toggleText: {
    //color: theme === 'dark' ? '#000' : '#fff',
  },
});
