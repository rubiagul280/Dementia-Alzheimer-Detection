/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../assets/colors/Colors';
import MapView, {Marker} from 'react-native-maps';

const API_KEY = 'AIzaSyA-F9moLzfO6nheP9hVOhH5wsRjNo8xr6U';

export default function Hospital() {
  const [region, setRegion] = useState({
    // latitude: 37.78825,
    // longitude: -122.4324,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitude: 33.6518,
    longitude: 73.1566,
    latitudeDelta: 0.1,
    longitudeDelta: 0.12,

  });
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=1000&type=hospital&key=AIzaSyA-F9moLzfO6nheP9hVOhH5wsRjNo8xr6U`,
    )
      .then(response => response.json())
      .then(data => {
        const hospitalMarkers = data.results.map(result => ({
          name: result.name,
          vicinity: result.vicinity,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          id: result.place_id,
        }));
        setMarkers(hospitalMarkers);
      })
      .catch(error => console.log(error));
  }, [region]);

  const handleSearch = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&location=${region.latitude},${region.longitude}&radius=5000&type=hospital&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        const hospitalMarkers = data.results.map(result => ({
          name: result.name,
          vicinity: result.vicinity,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          id: result.place_id,
        }));
        setMarkers(hospitalMarkers);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}>
          {markers.map(marker => (
            <Marker
              key={marker.id}
              title={marker.name}
              description={marker.vicinity}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ))}
        </MapView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for hospitals..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Button mode="contained" style={styles.button}>
              Search
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 10,
    padding: 3,
    paddingLeft: 20,
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 3,
  },
});
