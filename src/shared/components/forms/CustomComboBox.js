import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import CustomTheme from '../../styles/CustomThems';


const CustomComboBox = ({
  label,
  options = [],
  selectedValue,
  setSelectedValue,
  placeholder = 'انتخاب کنید...',
  iconName = 'arrow-drop-down',
  iconColor = CustomTheme.colors.primary,
  style,
  inputStyle,
  disabled = false,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

  const filteredOptions = options.filter((item) =>
    item.label?.toLowerCase().includes(searchText.toLowerCase())
  );

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || '';

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.selector,
          disabled && { opacity: 0.4 },
          error && styles.errorInput,
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[styles.selectedText, inputStyle]}>
          {selectedLabel || placeholder}
        </Text>
        <Icon name={iconName} size={20} color={iconColor} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TextInput
              style={styles.searchInput}
              placeholder={t('form.search')}
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />

            <ScrollView>
              {filteredOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    setSelectedValue(item.value);
                    setModalVisible(false);
                    setSearchText('');
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>{t('form.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: CustomTheme.spacing.xsmall,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: CustomTheme.colors.black,
    marginBottom: 6,
    fontWeight: '500',
    textAlign: 'right',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CustomTheme.colors.inputBacgournd,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    paddingHorizontal: 12,
    height: 45,
  },
  selectedText: {
    fontSize: 16,
    color: CustomTheme.colors.black,
    flex: 1,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '80%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: CustomTheme.colors.secondary,
  },
  errorInput: {
    borderColor: CustomTheme.colors.secondary,
  },
  errorText: {
    color: CustomTheme.colors.secondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default CustomComboBox;
