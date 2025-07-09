import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from 'expo-camera';

export default function QrReaderScreen() {
  // Kamera yönü (ön/arka)
  const [facing, setFacing] = useState<CameraType>('back');

  // Kamera izin kontrolü
  const [permission, requestPermission] = useCameraPermissions();

  // Kamera izni yükleniyor
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>İzin durumu yükleniyor...</Text>
      </View>
    );
  }

  // Kamera izni verilmemişse gösterilecek ekran
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Kamera izni gerekli</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Kamera yönünü değiştir
  const flipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  // Kamera gösterimi
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={flipCamera} style={styles.flipButton}>
            <Text style={styles.flipText}>Kamerayı Çevir</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 10,
  },
  flipText: {
    color: 'white',
    fontSize: 16,
  },
});
