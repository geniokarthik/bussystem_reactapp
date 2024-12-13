import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import { DATABASE_NAME } from  '../common/config';
const db = openDatabase({name: DATABASE_NAME});

const calculateDuration = (departureTime, arrivalTime) => {
  if (!departureTime || !arrivalTime) return 'Invalid Time'; // Handle undefined times

  const [depHours, depMinutes, depSeconds] = departureTime.split(':').map(Number);
  const [arrHours, arrMinutes, arrSeconds] = arrivalTime.split(':').map(Number);

  const depDate = new Date();
  depDate.setHours(depHours, depMinutes, depSeconds || 0);

  const arrDate = new Date();
  arrDate.setHours(arrHours, arrMinutes, arrSeconds || 0);

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
  const { data = [] } = route.params || {};
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = (item) => {
    setIsLoading(true);
    console.log('test',item);
    try {
      let query = '';
      let parameters = [];
  
      if (item.TYPE === 'direct') {
        query = `
          SELECT 
            rs.stop_order,
            s.stop_name,
            sc.arrival_time,
            sc.departure_time
          FROM RouteStops rs
          JOIN Stops s ON rs.stop_id = s.stop_id
          LEFT JOIN Schedule sc ON rs.stop_id = sc.stop_id 
            AND sc.bus_id = (
              SELECT r.bus_id
              FROM Routes r
              WHERE r.route_id = ?
            )
            AND sc.trip_number = ?
          WHERE rs.route_id = ?
          ORDER BY rs.stop_order;
        `;
        parameters = [item.first_route_id, item.trip_number, item.first_route_id];
      } else {
        query = `
         WITH FirstLeg AS (
                    -- Fetch stops for the first leg of the journey (up to the transfer stop)
                    SELECT 
                        rs.stop_order AS stop_order,
                        s.stop_name AS stop_name,
                        sc.arrival_time AS arrival_time,
                        sc.departure_time AS departure_time,
                        'First Bus' AS leg
                    FROM RouteStops rs
                    JOIN Stops s ON rs.stop_id = s.stop_id
                    LEFT JOIN Schedule sc ON rs.stop_id = sc.stop_id 
                        AND sc.bus_id = (
                            SELECT r.bus_id 
                            FROM Routes r
                            WHERE r.route_id = ? -- Route ID for the first bus
                        )
                        AND sc.trip_number = ? -- Trip number for the first bus
                    WHERE rs.route_id = ? 
                        AND rs.stop_order <= (
                            SELECT rs_transfer.stop_order
                            FROM RouteStops rs_transfer
                            WHERE rs_transfer.route_id = ? 
                            AND rs_transfer.stop_id = ? -- Transfer stop ID
                        )
                ),
                SecondLeg AS (
                    -- Fetch stops for the second leg of the journey (from the transfer stop)
                    SELECT 
                        rs.stop_order AS stop_order,
                        s.stop_name AS stop_name,
                        sc.arrival_time AS arrival_time,
                        sc.departure_time AS departure_time,
                        'Second Bus' AS leg
                    FROM RouteStops rs
                    JOIN Stops s ON rs.stop_id = s.stop_id
                    LEFT JOIN Schedule sc ON rs.stop_id = sc.stop_id 
                        AND sc.bus_id = (
                            SELECT r.bus_id 
                            FROM Routes r
                            WHERE r.route_id = ? -- Route ID for the second bus
                        )
                        AND sc.trip_number = ? -- Trip number for the second bus
                    WHERE rs.route_id = ? 
                        AND rs.stop_order >= (
                            SELECT rs_transfer.stop_order
                            FROM RouteStops rs_transfer
                            WHERE rs_transfer.route_id = ? 
                            AND rs_transfer.stop_id = ? -- Transfer stop ID
                        )
                )
                -- Combine both legs
                SELECT 
                    stop_order,
                    stop_name,
                    arrival_time,
                    departure_time,
                    leg
                FROM FirstLeg
                UNION ALL
                SELECT 
                    stop_order,
                    stop_name,
                    arrival_time,
                    departure_time,
                    leg
                FROM SecondLeg
                ORDER BY leg, stop_order;
        `;
        parameters = [
          item.first_route_id, item.trip_number, item.first_route_id,item.first_route_id,
           item.transfer_stop_id, item.second_route_id,
          item.second_trip_number,item.second_route_id, item.second_route_id, item.transfer_stop_id
        ];
      }
      console.log(query);
      console.log(parameters);
      db.transaction((tx) => {
        tx.executeSql(
          query,
          parameters,
          (_, result) => {
            const routes_detail = [];
            for (let i = 0; i < result.rows.length; i++) {
              routes_detail.push(result.rows.item(i));
            }
          //  console.log('Received Data in SearchList:', arrivalTime); // Log only inside the callback
            if (routes_detail.length > 0) {
              const arrivalTime =
    item.TYPE === 'direct' ? item.first_bus_arrival_time : item.second_bus_arrival_time;
              navigation.navigate(
                item.TYPE === 'direct' ? 'DirectRouteComponent' : 'TransferRouteDisplay',
                {
                  
                    data: routes_detail,  // Send routes_detail as 'data'
                    busdata: {
                      first_bus: item.first_bus,
                      departure_time :item.first_bus_departure_time|| 'N/A',
                      arrival_time :arrivalTime|| 'N/A',
                      second_bus: item.second_bus|| 'N/A',
                      transfer_stop: item.transfer_stop|| 'N/A',
                      departure_stop: item.departure_stop,
                      arrival_stop: item.arrival_stop,
                    },
                }
              );
            } else {
              Alert.alert('No Results', 'No buses found for the selected route.');
            }
          },
          (_, error) => {
            console.error('Query error:', error);
            Alert.alert('Error', 'Failed to execute query.');
          }
        );
      });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to fetch route details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const renderItem = ({ item }) => {
    const departureTime = item.first_bus_departure_time; // Fallback to empty string
    const arrivalTime =
    item.TYPE === 'direct' ? item.first_bus_arrival_time : item.second_bus_arrival_time;
    const duration = calculateDuration(departureTime, arrivalTime);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
        {/* Top row with name and type */}
        <View style={styles.row}>
          <Text style={styles.name}>{item.first_bus}</Text>
          <Text style={styles.type}>{item.TYPE === 'direct' ? 'Direct' : 'Transfer'}</Text>
        </View>

        {/* Middle row with departure, duration, and arrival */}
        <View style={styles.row}>
          <Text style={styles.time}>{departureTime || 'N/A'}</Text>
          <Text style={styles.duration}>{duration}</Text>
          <Text style={styles.time}>{arrivalTime || 'N/A'}</Text>
        </View>

        {/* Stops */}
        <View style={styles.row}>
          <Text style={styles.stop}>{item.departure_stop || 'Unknown Stop'}</Text>
          <Text style={styles.stop}>{item.arrival_stop || 'Unknown Stop'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
