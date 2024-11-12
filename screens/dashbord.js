import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
// Ensure you've installed axios using npm or yarn
import profileImage from '../assets/profile_image.jpg';

const AceBusApp = () => {
  const navigation = useNavigation();
  const [tripType, setTripType] = useState('One-way');
  const [passengerCount] = useState(2);
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/search', {
        departureCity: departureCity,
        destinationCity: destinationCity,
       // departureDate: departureDate,
      });
      console.log(response.data);
      if (response.status === 200) {
       // Alert.alert('Success', 'Search results fetched successfully!');
       navigation.navigate('SearchList', { data: response.data });
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert('Error', 'Unable to perform search. Please try again later.');
    }
  };
  return (
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
        />
        <TextInput
          style={styles.input}
          value={destinationCity}
          onChangeText={setDestinationCity}
          placeholder="Destination City"
        />
        <TextInput
          style={styles.input}
          value={departureDate}
          onChangeText={setDepartureDate}
          placeholder="Departure Date"
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

      <View style={styles.navBar}>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('list')}>
          <Text style={styles.navText}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F4F7',
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
    color: '#2C3E50',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BDC3C7',
  },
  tagline: {
    fontSize: 16,
    color: '#7F8C8D',
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
    backgroundColor: '#ECF0F1',
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
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  passengerContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFF',
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: '#2C3E50',
  },
});

export default AceBusApp;
