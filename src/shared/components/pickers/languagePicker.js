import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../styles/CustomThems';

const LanguagePicker = ({ options, selectedValue, setSelectedValue }) => {
  const [visible, setVisible] = useState(false);

  const selectedItem = options.find(item => item.code === selectedValue);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Icon name="language" color={CustomTheme.colors.primary} size={20} style={styles.icon} />
        <Text style={styles.text}>
          {selectedItem?.native_name || '...'}
        </Text>
        <Icon name="keyboard-arrow-down" color={CustomTheme.colors.primary} size={20} style={styles.arrow} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalBox}>
            <FlatList
                data={options}
                keyExtractor={(item, index) => item?.code || index.toString()}
                extraData={selectedValue}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setSelectedValue(item.code);
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item.native_name}</Text>
                  </TouchableOpacity>
                )}
              />

            
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    minWidth: 160,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: CustomTheme.colors.primary,
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginStart: 2,
    marginEnd: 2,
    tintColor: CustomTheme.colors.primary,
  },
  arrow: {
    width: 14,
    height: 14,
    marginStart: 2,
    marginEnd: 2,
    tintColor: CustomTheme.colors.primary,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000066',
  },
  modalBox: {
    marginHorizontal: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default LanguagePicker;
