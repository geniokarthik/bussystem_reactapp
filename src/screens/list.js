// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import api from '../api';


// const calculateDuration = (departureTime, arrivalTime) => {
//   if (!departureTime || !arrivalTime) {
//     return 'N/A'; // Return a fallback value if either time is missing
//   }

//   const [depHours, depMinutes, depSeconds] = departureTime.split(':').map(Number);
//   const [arrHours, arrMinutes, arrSeconds] = arrivalTime.split(':').map(Number);

//   const depDate = new Date();
//   depDate.setHours(depHours, depMinutes, depSeconds);

//   const arrDate = new Date();
//   arrDate.setHours(arrHours, arrMinutes, arrSeconds);

//   const durationMs = arrDate - depDate;
//   const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
//   const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

//   return `${durationHours}h ${durationMinutes}m`;
// };

// const List = () => {
//   const navigation = useNavigation();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get('/list');
//         const fetchedData = response.data.data.map((item, index) => ({
//           ...item,
//           uniqueKey: `${item.bus_number}_${item.depature_time}_${index}`,
//         }));
//         setData(fetchedData);
//       } catch (error) {
//         console.error('Network error details:', error.toJSON());
//         setError('Failed to fetch data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#2ECC71" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }) => {
//     const duration = calculateDuration(item.first_bus_departure_time, item.second_bus_arrival_time);
  
//     return (
//       <View style={styles.card}>
//         <View style={styles.headerRow}>
//           <Text style={styles.busName}>Bus {item.first_bus}</Text>
//           <Text style={styles.price}>£125</Text>
//         </View>
//         <View style={styles.timeRow}>
//           <Text style={styles.time}>{item.first_bus_departure_time}</Text>
          
//           { 
//             duration === '0h 0m' || duration === null ? (
//               <Text style={styles.duration}>Sorry</Text>
//             ) : (
//               <Text style={styles.duration}>{duration}</Text>
//             )
//           }
  
//           <Text style={styles.time}>{item.second_bus_arrival_time}</Text>
//         </View>
//         <View style={styles.locationRow}>
//           <Text style={styles.location}>{item.departure_stop}</Text>
//           <Text style={styles.location}>{item.arrival_stop}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           { 
//             item.transfer_stop_count === '0' || item.transfer_stop_count === null ? (
//               <Text style={styles.info}>Transfers: 0</Text>
//             ) : (
//               <Text style={styles.info}>Transfers: {item.transfer_stop_count}</Text>
//             )
//           }
//           <Text style={styles.info}>One-way</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('BusDetail', { item })}>
//             <Text style={styles.detailsButton}>Details</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
  
//   return (
//     <View style={styles.container}>
//       <FlatList
//   data={data}
//   renderItem={renderItem}
//   keyExtractor={(item, index) => `${item.bus_number}_${item.depature_time}_${index}`}
//   initialNumToRender={10}
//   maxToRenderPerBatch={10}
// />
      
//       <View style={styles.navBar}>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashbord')}>
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   container: {
//     flex: 1, // Ensure container takes full height
//     backgroundColor: '#F5F5F5',
//   },
//   cardList: {
//     paddingHorizontal: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     borderColor: '#E0E0E0',
//     borderWidth: 1,
//     marginBottom: 10,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   busName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00b394',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   timeRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   time: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   duration: {
//     fontSize: 14,
//     color: '#777',
//     backgroundColor: '#e0f7f7',
//     padding: 4,
//     borderRadius: 5,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   location: {
//     fontSize: 14,
//     color: '#666',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   info: {
//     fontSize: 14,
//     color: '#333',
//     backgroundColor: '#e0e0e0',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 5,
//   },
//   detailsButton: {
//     fontSize: 14,
//     color: '#007aff',
//     fontWeight: 'bold',
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#FFF',
//     paddingVertical: 15,
//     borderRadius: 5,
//   },
//   navButton: {
//     alignItems: 'center',
//   },
//   navText: {
//     color: '#2C3E50',
//   },
// });

// export default List;
