import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CustomTheme from '../styles/CustomThems';

const CustomComboBox = ({ options, selectedValue, setSelectedValue, placeholder = "Select an option..." }) => {
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputWrapper} onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.selectedText}>{selectedValue || placeholder}</Text>
      </TouchableOpacity>
      
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search..." 
            value={searchText} 
            onChangeText={setSearchText} 
          />
          <FlatList 
            data={filteredOptions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.option} onPress={() => {
                setSelectedValue(item);
                setIsDropdownOpen(false);
              }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 12,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    borderRadius: 8,
    padding: 10,
    backgroundColor: CustomTheme.colors.inputBacgournd,
  },
  selectedText: {
    fontSize: 16,
    color: '#000',
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 16,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomComboBox;
