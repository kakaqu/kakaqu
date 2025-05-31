import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageEditor from '@react-native-community/image-editor';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CROP_AREA_SIZE = SCREEN_WIDTH * 0.7; // Ekranın %70'i

const CustomCropper = ({ onCropComplete }) => {
  const [imageUri, setImageUri] = useState(null);
  const [cropMode, setCropMode] = useState('square'); // 'free', 'square', 'rectangle'

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false // Kendi crop ekranımızı kullanacağız
      });

      setImageUri(image.path);
    } catch (err) {
      console.log('Image picker error:', err);
    }
  };

  const cropImage = async () => {
    if (!imageUri) return;

    const cropData = {
      offset: { x: 0, y: (SCREEN_WIDTH - CROP_AREA_SIZE) / 2 }, // Merkezde kırpma alanı
      size: { width: CROP_AREA_SIZE, height: CROP_AREA_SIZE },
      displaySize: { width: 200, height: 200 }, // Çıktı boyutu
      resizeMode: 'contain'
    };

    try {
      const croppedUri = await ImageEditor.cropImage(imageUri, cropData);
      onCropComplete(croppedUri);
    } catch (e) {
      console.log('Crop failed', e);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <>
          <View style={[styles.cropArea, { width: CROP_AREA_SIZE, height: CROP_AREA_SIZE }]}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.previewImage} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.ratioButtons}>
            <TouchableOpacity 
              style={[styles.ratioButton, cropMode === 'free' && styles.activeButton]}
              onPress={() => setCropMode('free')}
            >
              <Text>Free</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.ratioButton, cropMode === 'square' && styles.activeButton]}
              onPress={() => setCropMode('square')}
            >
              <Text>Square</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.ratioButton, cropMode === 'rectangle' && styles.activeButton]}
              onPress={() => setCropMode('rectangle')}
            >
              <Text>Rectangle</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={cropImage}>
            <Text style={styles.doneButtonText}>Tamam</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Text>Fotoğraf Seç</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropArea: {
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  ratioButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratioButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  doneButton: {
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pickButton: {
    padding: 15,
    backgroundColor: '#eee',
  }
});

export default CustomCropper;