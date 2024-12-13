import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
const MapView = ({busData}) => {
    return (
      <View style={styles.mapContainer}>
        <Text style={styles.mapLabel}>Map View Placeholder</Text>
        <View style={styles.locationLine}>
          <Text style={styles.location}>{busData[0]?.departure_stop || 'N/A'}</Text>
          <Text style={styles.location}>{busData[0]?.arrival_stop || 'N/A'}</Text>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, backgroundColor: '#f5f5f5'},
    mapContainer: {
      height: 150,
      backgroundColor: '#d9d9d9',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    mapLabel: {fontSize: 16, color: '#333'},
    locationLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    
  });
export default MapView;