import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import { getDatabase  } from '../services/database';
import { DATABASE_NAME } from '../common/config';
import profileImage from '../assets/profile_image.jpg';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: DATABASE_NAME});
const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const [tripType, setTripType] = useState('One-way');
  const [passengerCount] = useState(6);
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [users, setUsers] = useState([]); // State to hold fetched data
  
  

  const handleSearch = async () => {
    if (!departureCity || !destinationCity) {
      Alert.alert('Error', 'Please enter both departure and destination cities.');
      return;
    }
  
    const checkDirectRoutes = () => {
      const query = `
        SELECT COUNT(r1.route_id) AS total_count
        FROM Routes r1
        JOIN RouteStops rs1_start ON r1.route_id = rs1_start.route_id
        JOIN RouteStops rs1_end ON r1.route_id = rs1_end.route_id
        JOIN Stops s1 ON rs1_start.stop_id = s1.stop_id
        JOIN Stops s2 ON rs1_end.stop_id = s2.stop_id
        JOIN Bus b1 ON r1.bus_id = b1.bus_id
        JOIN Schedule sc1 ON b1.bus_id = sc1.bus_id AND s1.stop_id = sc1.stop_id
        JOIN Schedule sc2 ON b1.bus_id = sc2.bus_id AND s2.stop_id = sc2.stop_id AND sc1.trip_number = sc2.trip_number
        WHERE 
            rs1_start.stop_order < rs1_end.stop_order  
            AND s1.stop_name = ?  
            AND s2.stop_name = ?;
      `;
    
      db.transaction(tx => {
        tx.executeSql(
          query,
          [departureCity, destinationCity],
          (_, result) => {
            const routeCount = result.rows.item(0).total_count;
            if (routeCount > 0) {
              fetchDirectRoutes(); // Run direct_route if there are direct routes
            } else {
              Alert.alert('No Results', 'No buses found for the selected route.');
            }
          },
          (_, error) => {
            console.error('Direct Routes Query error:', error);
            Alert.alert('Error', 'Failed to check direct routes.');
          }
        );
      });
    };

    const checkTransferRoutes = () => {
      const query = `
        SELECT COUNT(r1.route_id) AS total_count
        FROM Routes r1
        JOIN RouteStops rs1 ON r1.route_id = rs1.route_id
        JOIN Stops s1 ON rs1.stop_id = s1.stop_id
        JOIN Transfer t ON t.from_route_id = r1.route_id
        JOIN Routes r2 ON t.to_route_id = r2.route_id
        JOIN RouteStops rs2 ON r2.route_id = rs2.route_id
        JOIN Stops s2 ON rs2.stop_id = s2.stop_id
        JOIN Stops ts ON t.transfer_stop_id = ts.stop_id
        JOIN Bus b1 ON r1.bus_id = b1.bus_id
        JOIN Bus b2 ON r2.bus_id = b2.bus_id
        JOIN Schedule sc1 ON b1.bus_id = sc1.bus_id AND s1.stop_id = sc1.stop_id
        JOIN Schedule sc2 ON b2.bus_id = sc2.bus_id AND s2.stop_id = sc2.stop_id
        JOIN Schedule t1 ON b1.bus_id = t1.bus_id AND t.transfer_stop_id = t1.stop_id AND t1.trip_number = sc1.trip_number
        JOIN Schedule t2 ON b2.bus_id = t2.bus_id AND t.transfer_stop_id = t2.stop_id AND sc2.trip_number = t2.trip_number
        WHERE
            t1.trip_number = sc1.trip_number AND t1.arrival_time <= t2.departure_time 
            AND s1.stop_name = ? 
            AND s2.stop_name = ?;
      `;
    
      db.transaction(tx => {
        tx.executeSql(
          query,
          [departureCity, destinationCity],
          (_, result) => {
            const routeCount = result.rows.item(0).total_count;
            if (routeCount > 0) {
              fetchTransferRoutes(); // Run transfer_route if there are transfer routes
            } else {
              Alert.alert('No Results', 'No buses found for the selected route.');
            }
          },
          (_, error) => {
            console.error('Transfer Routes Query error:', error);
            Alert.alert('Error', 'Failed to check transfer routes.');
          }
        );
      });
    };

    const fetchDirectRoutes = () => {
      return new Promise((resolve, reject) => {
        const query = `
          SELECT
            r1.route_id AS first_route_id,
            sc1.trip_number AS trip_number,
            b1.bus_name AS first_bus,
            s1.stop_name AS departure_stop,
            sc1.departure_time AS first_bus_departure_time,
            sc2.arrival_time AS first_bus_arrival_time,
            NULL AS transfer_stop,
            NULL AS transfer_stop_id,
            NULL AS second_bus,
            s2.stop_name AS arrival_stop,
            NULL AS second_bus_departure_time,
            NULL AS second_trip_number,
            NULL AS second_bus_transfer_departure_time,
            NULL AS second_route_id,
            'direct' AS TYPE
          FROM Routes r1
          JOIN RouteStops rs1_start ON r1.route_id = rs1_start.route_id
          JOIN RouteStops rs1_end ON r1.route_id = rs1_end.route_id
          JOIN Stops s1 ON rs1_start.stop_id = s1.stop_id
          JOIN Stops s2 ON rs1_end.stop_id = s2.stop_id
          JOIN Bus b1 ON r1.bus_id = b1.bus_id
          JOIN Schedule sc1 ON b1.bus_id = sc1.bus_id AND s1.stop_id = sc1.stop_id
          JOIN Schedule sc2 ON b1.bus_id = sc2.bus_id AND s2.stop_id = sc2.stop_id AND sc1.trip_number = sc2.trip_number
          WHERE
            rs1_start.stop_order < rs1_end.stop_order AND s1.stop_name = ? AND s2.stop_name = ?;
        `;
  
        db.transaction(tx => {
          tx.executeSql(
            query,
            [departureCity, destinationCity],
            (_, result) => {
              const routes = [];
              for (let i = 0; i < result.rows.length; i++) {
                routes.push(result.rows.item(i));
              }
              resolve(routes);
            },
            (_, error) => {
              console.error('Direct route error:', error);
              reject(error);
            }
          );
        });
      });
    };
  
    const fetchTransferRoutes = () => {
      return new Promise((resolve, reject) => {
        const query = `
          SELECT
            r1.route_id AS first_route_id,
            sc1.trip_number AS trip_number,
            b1.bus_name AS first_bus,
            s1.stop_name AS departure_stop,
            sc1.departure_time AS first_bus_departure_time,
            t1.arrival_time AS first_bus_transfer_arrival_time,
            ts.stop_name AS transfer_stop,
            t.transfer_stop_id AS transfer_stop_id,
            b2.bus_name AS second_bus,
            s2.stop_name AS arrival_stop,
            sc2.departure_time AS second_bus_departure_time,
            sc2.trip_number AS second_trip_number,
            t2.departure_time AS second_bus_transfer_departure_time,
            r2.route_id AS second_route_id,
            'transfer' AS TYPE
          FROM Routes r1
          JOIN RouteStops rs1 ON r1.route_id = rs1.route_id
          JOIN Stops s1 ON rs1.stop_id = s1.stop_id
          JOIN Transfer t ON t.from_route_id = r1.route_id
          JOIN Routes r2 ON t.to_route_id = r2.route_id
          JOIN RouteStops rs2 ON r2.route_id = rs2.route_id
          JOIN Stops s2 ON rs2.stop_id = s2.stop_id
          JOIN Stops ts ON t.transfer_stop_id = ts.stop_id
          JOIN Bus b1 ON r1.bus_id = b1.bus_id
          JOIN Bus b2 ON r2.bus_id = b2.bus_id
          JOIN Schedule sc1 ON b1.bus_id = sc1.bus_id AND s1.stop_id = sc1.stop_id
          JOIN Schedule sc2 ON b2.bus_id = sc2.bus_id AND s2.stop_id = sc2.stop_id
          JOIN Schedule t1 ON b1.bus_id = t1.bus_id AND t.transfer_stop_id = t1.stop_id AND t1.trip_number = sc1.trip_number
          JOIN Schedule t2 ON b2.bus_id = t2.bus_id AND t.transfer_stop_id = t2.stop_id AND sc2.trip_number = t2.trip_number
          WHERE
            t1.trip_number = sc1.trip_number AND t1.arrival_time <= t2.departure_time 
            AND s1.stop_name = ? AND s2.stop_name = ?;
        `;
  
        db.transaction(tx => {
          tx.executeSql(
            query,
            [departureCity, destinationCity],
            (_, result) => {
              const routes = [];
              for (let i = 0; i < result.rows.length; i++) {
                routes.push(result.rows.item(i));
              }
              resolve(routes);
            },
            (_, error) => {
              console.error('Transfer route error:', error);
              reject(error);
            }
          );
        });
      });
    };
  
    try {
      const directRoutes = await fetchDirectRoutes();
      const transferRoutes = await fetchTransferRoutes();
      const combinedRoutes = [...directRoutes, ...transferRoutes];
 
      if (combinedRoutes.length > 0) {
        console.log('Received Data in dash:', combinedRoutes);
        navigation.navigate('SearchList', { data: combinedRoutes });
      } else {
        Alert.alert('No Results', 'No buses found for the selected route.');
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
      Alert.alert('Error', 'Failed to fetch route data.');
    }
  };


  return (
    <ImageBackground
    source={{
      uri: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', // Online image URL
    }}
    style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>TN Bus</Text>
          <Image style={styles.profilePic} source={profileImage} />
        </View>

        <Text style={styles.tagline}>Find cheap bus tickets</Text>

        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'One-way' && styles.activeTripType,
            ]}
            onPress={() => setTripType('One-way')}>
            <Text style={styles.tripTypeText}>One-way</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'Round trip' && styles.activeTripType,
            ]}
            onPress={() => setTripType('Round trip')}>
            <Text style={styles.tripTypeText}>Round trip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={departureCity}
            onChangeText={setDepartureCity}
            placeholder="Departure City"
            placeholderTextColor="#BDC3C7"
          />
          <TextInput
            style={styles.input}
            value={destinationCity}
            onChangeText={setDestinationCity}
            placeholder="Destination City"
            placeholderTextColor="#BDC3C7"
          />
          <TextInput
            style={styles.input}
            value={departureDate}
            onChangeText={setDepartureDate}
            placeholder="Departure Date"
            placeholderTextColor="#BDC3C7"
          />
          <View style={styles.passengerContainer}>
            <Text style={styles.passengerText}>{passengerCount} Passengers</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.ticketInfoContainer}>
          <View style={styles.ticketPriceBox}>
            <Text style={styles.priceText}>Cheapest</Text>
            <Text style={styles.priceValue}>£125</Text>
          </View>
          <View style={styles.ticketPriceBox}>
            <Text style={styles.priceText}>Average</Text>
            <Text style={styles.priceValue}>£146</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay for readability
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BDC3C7',
  },
  tagline: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tripTypeButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent for layering
  },
  activeTripType: {
    backgroundColor: '#2ECC71',
  },
  tripTypeText: {
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent
    marginBottom: 10,
    color: '#2C3E50',
  },
  passengerContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
  },
  passengerText: {
    color: '#2C3E50',
  },
  searchButton: {
    backgroundColor: '#2980B9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ticketPriceBox: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent for better readability
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  priceText: {
    color: '#7F8C8D',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});

export default Dashboard;