/* eslint-disable prettier/prettier */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

export default function Hospital({navigation, hospitals}) {

    const initialRegion = {
    latitude: hospitals[0].geometry.location.lat,
    longitude: hospitals[0].geometry.location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function getLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude});
        },
        error => {
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  }

  async function handleSelectPlace(place) {
    try {
      const {lat, lng} = place.geometry.location;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=<your-api-key>`,
      );
      const data = await response.json();
      console.log('Nearby hospitals:', data.results);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <View>
        <GooglePlacesAutocomplete
          placeholder="Search for hospitals"
          onPress={handleSelectPlace}
          query={{
            key: '<your-api-key>',
            language: 'en',
            types: 'establishment',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
        />
        <MapView style={{flex: 1}} initialRegion={initialRegion}>
          {hospitals.map(hospital => (
            <Marker
              key={hospital.place_id}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title={hospital.name}
              description={hospital.vicinity}
            />
          ))}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
