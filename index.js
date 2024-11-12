import { AppRegistry } from 'react-native';
import AppNavigator from './Navigation'; // Import the navigation setup
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => AppNavigator);
