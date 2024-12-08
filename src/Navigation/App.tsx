import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Ensure proper imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Dashbord from '../screens/dashbord';
// import List from './src/screens/list';
import BusDetail from '../screens/bus_detail';
import SearchList from '../screens/search_list';
import ProfileDetail from '../screens/profile_detail';
import ProfileScreen from '../screens/profile_screen';
import LoginScreen from '../screens/login_screen';
import CustomHeader from '../screens/customheader';
import DirectRouteComponent  from '../components/directRouteDidplay';
import TransferRouteDisplay  from '../components/routeDisplayComponent';
import { initializeDatabase } from '../services/database';
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAndInitializeDatabase = async () => {
      const isInitialized = await AsyncStorage.getItem('DATABASE_INITIALIZED');
console.log(isInitialized);

      if (!isInitialized) {
        await initializeDatabase();
        console.log('Database initialized for the first time.');
      } else {
        console.log('Database already initialized.');
      }
    };

    checkAndInitializeDatabase();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token); // Determine login status
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, route }) => {
            if (isLoggedIn) {
              return (
                <CustomHeader
                  title={route.name}
                  onMenuPress={() => navigation.goBack()}
                  onLogoutPress={() => alert('Logout pressed')}
                />
              );
            }
            return null;
          },
        }}
      >
        {isLoggedIn === null ? (
          <Stack.Screen name="Loading">
            {() => (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
              </View>
            )}
          </Stack.Screen>
        ) : isLoggedIn ? (
          <>
          
        
            <Stack.Screen name="dashbord" component={Dashbord} />
            {/* <Stack.Screen name="list" component={List} /> */}
            <Stack.Screen name="BusDetail" component={BusDetail} />
            <Stack.Screen name="SearchList" component={SearchList} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="DirectRouteComponent" component={DirectRouteComponent} />
            <Stack.Screen name="TransferRouteDisplay" component={TransferRouteDisplay} />
          </>
        ) : (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;