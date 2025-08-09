import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ShopCommentForm = ({ onSubmit, loading = false }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Yorum yaz..."
        placeholderTextColor="#999"
        multiline
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSend} disabled={loading || text.trim() === ''} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>{loading ? '...' : 'Gönder'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopCommentForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
