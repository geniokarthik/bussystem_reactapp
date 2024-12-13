import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DirectRouteComponent from '../components/routeDisplayComponent';
import MapView from '../components/mapViewComponent';


const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) {
    return 'N/A'; // Return a fallback value if either time is missing
  }

  const [depHours, depMinutes, depSeconds] = departureTime.split(':').map(Number);
  const [arrHours, arrMinutes, arrSeconds] = arrivalTime.split(':').map(Number);

  const depDate = new Date();
  depDate.setHours(depHours, depMinutes, depSeconds);

  const arrDate = new Date();
  arrDate.setHours(arrHours, arrMinutes, arrSeconds);

  const durationMs = arrDate - depDate;
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${durationHours}h ${durationMinutes}m`;
};

const SearchList = ({route}) => {
  const busData = route?.params?.item ? [route.params.item] : [];
  const departureTime = busData[0].first_bus_departure_time; // "05:00:00"
  const arrivalTime = busData[0].second_bus_arrival_time; // "07:00:00"
  const duration = calculateDuration(departureTime, arrivalTime);

  // Header component for the FlatList
  const ListHeader = () => (
    <MapView busData={busData}/>
  );

  const ListFooter = () => (
    <View >
      <DirectRouteComponent ></DirectRouteComponent >
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Bus Information Card */}
      {busData.length > 0 && (
        <View style={styles.card}>
          {/* Bus Company and Price Row */}
          <View style={styles.headerRow}>
            <Text style={styles.company}>{busData[0].bus_name}</Text>
            <Text style={styles.price}>£125</Text>
          </View>

          {/* Time and Duration Row */}
          <View style={styles.timeRow}>
            <Text style={styles.time}>{busData[0].first_bus_departure_time}</Text>
            <Text style={styles.duration}>{duration}</Text>
            <Text style={styles.time}>{busData[0].second_bus_arrival_time}</Text>
          </View>

          {/* Departure and Arrival Stops */}
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>
              {busData[0].departure_stop}
            </Text>
            <Text style={styles.locationLabel}>{busData[0].arrival_stop}</Text>
          </View>

          {/* Info Row */}
         

          {/* Stop Details */}
          <View style={styles.stopDetails}>
            <FlatList
              ListHeaderComponent={ListHeader} // Add the header for the list
              ListFooterComponent={ListFooter} // Add the footer for the list
              data={busData[0].stop_details?.split(' -> ') || []}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                const [stopName, stopTime] = item.split(' (');

                return (
                  <View style={styles.stopRow}>
                    <FontAwesome
                      name="map-marker"
                      size={20}
                      color="#555"
                      style={styles.icon}
                    />
                    <View>
                      <Text style={styles.stopName}>{stopName}</Text>
                      <Text style={styles.stopTime}>
                        {stopTime?.replace(')', '')}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
         
        </View>
      )}
    </ScrollView>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  company: {fontSize: 16, fontWeight: 'bold', color: '#0abf53'},
  price: {fontSize: 18, fontWeight: 'bold', color: '#333'},
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  time: {fontSize: 16, fontWeight: 'bold', color: '#333'},

  duration: {
    fontSize: 14,
    color: '#777',
    backgroundColor: '#e0f7f7',
    padding: 4,
    borderRadius: 5,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  locationLabel: {fontSize: 14, color: '#555'},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 15,
  },
  info: {fontSize: 14, color: '#888'},
  stopDetails: {marginTop: 10},
  stopRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  icon: {marginRight: 10},
  stopName: {fontSize: 14, fontWeight: 'bold'},
  stopTime: {fontSize: 12, color: '#888'},
});

export default SearchList;
