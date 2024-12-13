import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TransferRouteDisplayComponent = ({ route }) => {
  const { data = [], busdata = {} } = route.params || {};

  console.log('Bus Data:', busdata);
  console.log('Stops:', data);

  // Separate stops into first and second bus legs
  const firstBusStops = data.filter(stop => stop.leg === 'First Bus');
  const secondBusStops = data.filter(stop => stop.leg === 'Second Bus');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Starting Stop */}
      <View style={styles.timeline}>
        {firstBusStops.length > 0 && (
          <View style={styles.stopContainer}>
            <MaterialIcons name="location-on" size={24} color="#007bff" />
            <View style={styles.stopTextContainer}>
              <Text style={styles.stopText}>{busdata.departure_stop}</Text>
              <Text style={styles.timeText}>
              {busdata.departure_time || 'N/A'}
              </Text>
            </View>
          </View>
        )}

        {/* First Bus Route */}
        <View style={styles.busContainer}>
          <Text style={styles.busText}>First Bus: {busdata.first_bus}</Text>
        </View>

        {/* Stops for First Bus */}
        {firstBusStops.map((stop, index) => (
          <View key={index} style={styles.routeContainer}>
            <MaterialIcons name="directions-bus" size={20} color="#1E90FF" />
            <View style={styles.stopInfo}>
              <Text style={styles.stopLabel}>{stop.stop_name}</Text>
              <Text style={styles.timeText}>
                {stop.arrival_time} - {stop.departure_time}
              </Text>
            </View>
          </View>
        ))}

        {/* Transfer to Next Bus */}
        <View style={styles.transferContainer}>
          <Text style={styles.transferText}>
            Transfer at {busdata.transfer_stop}
          </Text>
        </View>

        {/* Next Bus Route */}
        <View style={styles.busContainer}>
          <Text style={styles.busText}>Second Bus: {busdata.second_bus}</Text>
        </View>

        {/* Stops for Second Bus */}
        {secondBusStops.map((stop, index) => (
          <View key={index} style={styles.routeContainer}>
            <MaterialIcons name="directions-bus" size={20} color="#1E90FF" />
            <View style={styles.stopInfo}>
              <Text style={styles.stopLabel}>{stop.stop_name}</Text>
              <Text style={styles.timeText}>
                {stop.departure_time} - {stop.arrival_time}
              </Text>
            </View>
          </View>
        ))}

        {/* Ending Stop */}
        {secondBusStops.length > 0 && (
          <View style={styles.stopContainer}>
            <MaterialIcons name="location-on" size={24} color="#d32f2f" />
            <View style={styles.stopTextContainer}>
              <Text style={styles.stopText}>{busdata.arrival_stop}</Text>
              <Text style={styles.timeText}>
              {secondBusStops[secondBusStops.length - 1]?.departure_time || 'N/A'} -{' '}
              {secondBusStops[secondBusStops.length - 1]?.arrival_time || 'N/A'}
              </Text>
            </View>
          </View>
        )}
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
  transferContainer: {
    alignItems: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  transferText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e65100',
  },
  endContainer: { alignItems: 'center' },
  footerText: { fontSize: 14, color: '#888' },
});

export default TransferRouteDisplayComponent;
