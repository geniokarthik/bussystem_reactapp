import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AceBusApp from './screens/dashbord'; // Make sure path is correct
import List from './screens/list';          // Make sure path is correct
import BusDetail from './screens/bus_detail';
import SearchList from './screens/search_list'; 
import ProfileScreen from './screens/profile_screen'; 
import LoginScreen from './screens/login_screen'; 
import PasswordRecoveryScreen from './screens/password_recovery_screen'; 
const Stack = createStackNavigator();

function AppNavigator () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TN Bus">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryScreen} />
        <Stack.Screen name="TN Bus" component={AceBusApp} />
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="BusDetail" component={BusDetail} />
        <Stack.Screen name="SearchList" component={SearchList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;


