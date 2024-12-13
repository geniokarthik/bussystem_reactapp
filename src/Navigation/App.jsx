import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DrawerNavigator from './DrawerNavigator'
import Dashboard from '../screens/dashboard';
import BusDetail from '../screens/bus_detail';
import SearchList from '../screens/search_list';
import ProfileDetail from '../screens/profile_detail';
import ProfileScreen from '../screens/profile_screen';
import LoginScreen from '../screens/login_screen';
import CustomHeader from '../screens/customheader'; // Custom Header Component
import DirectRouteComponent from '../components/directRouteDidplay';
import TransferRouteDisplay from '../components/routeDisplayComponent';
import { initializeDatabase } from '../services/database';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Track login status
  const [loading, setLoading] = useState(true); // Track loading status

  useEffect(() => {
    const checkAndInitializeDatabase = async () => {
      const isInitialized = await AsyncStorage.getItem('DATABASE_INITIALIZED');
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
      try {
        const token = await AsyncStorage.getItem('authToken');
        setIsLoggedIn(!!token); // Set login status based on token existence
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false); // Ensure loading completes
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    // Optionally display a loading screen or spinner
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Dashboard" : "LoginScreen"}>
        {/* Secure Screens */}
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigator} // Use Drawer Navigator
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusDetail"
          component={BusDetail}
          options={{
            header: (props) => <CustomHeader {...props} title="Bus Detail" />,
          }}
        />
        <Stack.Screen
          name="SearchList"
          component={SearchList}
          options={{
            header: (props) => <CustomHeader {...props} title="Search List" />,
          }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetail}
          options={{
            header: (props) => <CustomHeader {...props} title="Profile Detail" />,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DirectRouteComponent"
          component={DirectRouteComponent}
          options={{
            header: (props) => <CustomHeader {...props} title="Direct Route" />,
          }}
        />
        <Stack.Screen
          name="TransferRouteDisplay"
          component={TransferRouteDisplay}
          options={{
            header: (props) => <CustomHeader {...props} title="Transfer Route" />,
          }}
        />

        {/* Public Screens */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} // No custom header for Login Screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
