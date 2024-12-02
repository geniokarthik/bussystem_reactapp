import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const calculateDuration = (departureTime, arrivalTime) => {
  const [depHours, depMinutes, depSeconds] = departureTime.split(':').map(Number);
  const [arrHours, arrMinutes, arrSeconds] = arrivalTime.split(':').map(Number);

  const depDate = new Date();
  depDate.setHours(depHours, depMinutes, depSeconds);

  const arrDate = new Date();
  arrDate.setHours(arrHours, arrMinutes, arrSeconds);

  // Handle case where arrival time is past midnight
  if (arrDate < depDate) {
    arrDate.setDate(arrDate.getDate() + 1);
  }

  const durationMs = arrDate - depDate;
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${durationHours}h ${durationMinutes}m`;
};

const SearchList = ({ route }) => {
  const { data } = route.params || {};
  const busData = data?.data || [];
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async (item) => {
    setIsLoading(true);
    try {
      let url = '';
      let parameters = {};
      if (item.type === 'direct') {
        url = 'http://10.0.2.2:8000/api/direct_route';
        parameters = {
          route_id: item.first_route_id,
          trip_number: item.first_trip_number,
          first_bus: item.first_bus,
          departure_stop: item.departure_stop,
          arrival_stop: item.arrival_stop,
        };
      } else {
        url = 'http://10.0.2.2:8000/api/transfer_route';
        parameters = {
          first_route_id: item.first_route_id,
          first_trip_number: item.first_trip_number,
          transfer_stop_id: item.transfer_stop_id,
          second_route_id: item.second_route_id,
          second_trip_number: item.second_trip_number,
          first_bus: item.first_bus,
          second_bus: item.second_bus,
          transfer_stop: item.transfer_stop,
          departure_stop: item.departure_stop,
          arrival_stop: item.arrival_stop,
        };
      }
      const response = await axios.post(url, parameters);
      const data = response.data;
      const responsebusData = response.additional_info;
      
      if (response.status === 200) {
        navigation.navigate(
          item.type === 'direct' ? 'DirectRouteComponent' : 'TransferRouteDisplay',
          { data}
        );
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert(
        'Network Error',
        error.response?.data?.message || 'Unable to fetch route details. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderItem = ({ item }) => {
    const departureTime = item.first_bus_departure_time;
    const arrivalTime =
      item.type === 'direct' ? item.first_bus_arrival_time : item.second_bus_arrival_time;
    const duration = calculateDuration(departureTime, arrivalTime);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
        {/* Top row with name and type */}
        <View style={styles.row}>
          <Text style={styles.name}>{item.first_bus}</Text>
          <Text style={styles.type}>{item.type === 'direct' ? 'Direct' : 'Transfer'}</Text>
        </View>

        {/* Middle row with departure, duration, and arrival */}
        <View style={styles.row}>
          <Text style={styles.time}>{departureTime}</Text>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.time}>{arrivalTime}</Text>
        </View>

        {/* Stops */}
        <View style={styles.row}>
          <Text style={styles.stop}>{item.departure_stop}</Text>
          <Text style={styles.stop}>{item.arrival_stop}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={busData}
        keyExtractor={(item, index) => item.route_id || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  type: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 14,
    color: '#444',
  },
  duration: {
    fontSize: 14,
    color: '#888',
  },
  stop: {
    fontSize: 12,
    color: '#666',
  },
});

export default SearchList;
