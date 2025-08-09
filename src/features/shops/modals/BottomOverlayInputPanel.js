import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

const BottomOverlayInputPanel = ({
  visible,
  placeholder = 'Yorum yaz...',
  value,
  onChangeText,
  onSend,
  onClose,
  leftIcon = 'information-circle-outline',
  rightIcons = ['happy-outline', 'at-outline'],
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useState(new Animated.Value(200))[0];

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      onClose?.();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 200,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible && keyboardHeight === 0) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          bottom: Platform.OS === 'ios' ? keyboardHeight : 0,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <Ionicons name={leftIcon} size={22} color="#007bff" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          multiline
        />
        {rightIcons.map((icon, idx) => (
          <TouchableOpacity key={idx} style={{ marginHorizontal: 4 }}>
            <Ionicons name={icon} size={20} color="#888" />
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onSend} style={styles.sendButton}>
          <Ionicons name="arrow-up" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  placeholder: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 20,
    marginLeft: 4,
  },
});

export default BottomOverlayInputPanel;
