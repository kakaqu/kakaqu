// src/shared/components/MapWrapper.js
import { Platform } from 'react-native';

let MapView = () => null;
let Marker = () => null;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export { MapView, Marker };
