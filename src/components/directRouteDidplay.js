import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DirectRouteComponent  = ({ route }) => {
  const { data = [], busdata = {} } = route.params || {};  // 'data' is the array of stops here

  console.log('Bus Data:', busdata);  
  console.log('Stops:', data);

  // Ensure 'data' is an array of stops and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No stops available to display.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Start Stop */}
      <View style={styles.timeline}>
        <View style={styles.stopContainer}>
          <MaterialIcons name="location-on" size={24} color="#007bff" />
          <View style={styles.stopTextContainer}>
            <Text style={styles.stopText}>
              {busdata.departure_stop || 'Unknown Departure Stop'}
            </Text>
            <Text style={styles.timeText}>
              {busdata.departure_time || 'N/A'}
            </Text>
          </View>
        </View>

        {/* First Bus Route */}
        <View style={styles.busContainer}>
          <Text style={styles.busText}>First Bus: {busdata.first_bus || 'N/A'}</Text>
        </View>

        {/* Stops for First Bus */}
        {data.map((stop, index) => (
          <View key={index} style={styles.routeContainer}>
            <MaterialIcons name="directions-bus" size={20} color="#1E90FF" />
            <View style={styles.stopInfo}>
              <Text style={styles.stopLabel}>
                {stop.stop_name || 'Unknown Stop'}
              </Text>
              <Text style={styles.timeText}>
              {stop.arrival_time} - {stop.departure_time}
              </Text>
            </View>
          </View>
        ))}

        {/* End Stop */}
        <View style={styles.stopContainer}>
          <MaterialIcons name="location-on" size={24} color="#d32f2f" />
          <View style={styles.stopTextContainer}>
            <Text style={styles.stopText}>
              {busdata.arrival_stop || 'Unknown Arrival Stop'}
            </Text>
            <Text style={styles.timeText}>
            {busdata.arrival_time || 'N/A'} - Your destination
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.endContainer}>
        <Text style={styles.footerText}>End of Route Details</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: '#d3d3d3',
    paddingLeft: 20,
    position: 'relative',
  },
  stopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stopTextContainer: {
    marginLeft: 15,
  },
  stopText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timeText: {
    fontSize: 14,
    color: '#808080',
  },
  busContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  busText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  stopInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  stopLabel: {
    fontSize: 16,
    color: '#333',
  },
  endContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#d32f2f',
  },
});

export default DirectRouteComponent;
