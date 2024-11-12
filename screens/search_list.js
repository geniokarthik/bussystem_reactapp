import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const calculateDuration = (departureTime, arrivalTime) => {
  const [depHours, depMinutes, depSeconds] = departureTime
    .split(':')
    .map(Number);
  const [arrHours, arrMinutes, arrSeconds] = arrivalTime.split(':').map(Number);

  const depDate = new Date();
  depDate.setHours(depHours, depMinutes, depSeconds);

  const arrDate = new Date();
  arrDate.setHours(arrHours, arrMinutes, arrSeconds);

  const durationMs = arrDate - depDate;
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (durationMs % (1000 * 60 * 60)) / (1000 * 60),
  );

  return `${durationHours}h ${durationMinutes}m`;
};

const SearchList = ({route, navigation}) => {
  const {data} = route.params || {};
  const busData = data?.data || []; // Extract inner data array

  return (
    <View style={styles.container}>
      <FlatList
        data={busData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          const departureTime = item.depature_time; // "05:00:00"
          const arrivalTime = item.arrival_time; // "07:00:00"
          const duration = calculateDuration(departureTime, arrivalTime);

          return (
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.busName}>{item.bus_name}</Text>
                <Text style={styles.price}>£125</Text>
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.time}>{departureTime}</Text>
                <Text style={styles.duration}>{duration}</Text>
                <Text style={styles.time}>{arrivalTime}</Text>
              </View>
              <View style={styles.locationRow}>
                <Text style={styles.location}>{item.departure_stop}</Text>
                <Text style={styles.location}>{item.arrival_stop}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.info}>1 transfer</Text>
                <Text style={styles.info}>2 Passengers</Text>
                <Text style={styles.info}>One-way</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BusDetail', {item})}>
                  <Text style={styles.detailsButton}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d9f2f2',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00b394',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#777',
    backgroundColor: '#e0f7f7',
    padding: 4,
    borderRadius: 5,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  detailsButton: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: 'bold',
  },
});

export default SearchList;
