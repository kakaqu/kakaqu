// src/app/storage.js
import { Platform } from 'react-native';

let storage;

if (Platform.OS === 'web') {
  // Web: localStorage
  storage = require('redux-persist/lib/storage').default;
} else {
  // Mobil (iOS / Android): AsyncStorage
  storage = require('@react-native-async-storage/async-storage').default;
}

export default storage;
