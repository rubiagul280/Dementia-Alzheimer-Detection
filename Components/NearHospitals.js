/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-google-maps';

const API_KEY = 'AIzaSyAZkgAWX0jTbmDn9A3FvtcgHAK0brzIJ90';

export default function Hospital({navigation}) {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=5000&type=hospital&key=${API_KEY}`,
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
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
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
