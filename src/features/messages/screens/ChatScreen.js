import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import TopBar from '../../navigation/TopBar';

const ChatScreen = ({ route }) => {
  const { conversationId, title } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    setMessages([
      { id: 'm1', sender: 'other', text: 'Merhaba!', sentAt: new Date().toISOString() },
    ]);
  }, []);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      sentAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      // send image logic
      console.log('Gönderilen kamera görseli:', result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result?.assets || result?.uri) {
      // send file logic
      console.log('Gönderilen dosya:', result.assets?.[0]?.uri || result.uri);
    }
  };

  const startVoiceRecording = () => {
    // Ses kaydı başlat (Mock)
    console.log('🎤 Ses kaydı başladı...');
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start',
        backgroundColor: item.sender === 'me' ? '#007AFF' : '#E5E5EA',
        borderRadius: 12,
        padding: 10,
        marginVertical: 4,
        maxWidth: '70%',
      }}
    >
      <Text style={{ color: item.sender === 'me' ? 'white' : 'black' }}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <TopBar title={title} />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Chat Input Alanı */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderColor: '#ddd',
          backgroundColor: 'white',
        }}
      >
        {/* Emoji */}
        <TouchableOpacity style={{ marginRight: 6 }}>
          <Entypo name="emoji-happy" size={24} color="#777" />
        </TouchableOpacity>

        {/* TextInput */}
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: Platform.OS === 'ios' ? 12 : 8,
            maxHeight: 120,
          }}
          placeholder="Mesaj yaz..."
          multiline
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Kamera ikonu (sadece input boşsa göster) */}
        {inputText.trim() === '' && (
          <TouchableOpacity onPress={pickImageFromCamera} style={{ marginLeft: 6 }}>
            <MaterialIcons name="photo-camera" size={24} color="#777" />
          </TouchableOpacity>
        )}

        {/* Dosya ikonu (her zaman görünür) */}
        <TouchableOpacity onPress={pickDocument} style={{ marginLeft: 6 }}>
          <Ionicons name="attach" size={24} color="#777" />
        </TouchableOpacity>

        {/* Gönder veya Mikrofon */}
        {inputText.trim() ? (
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              backgroundColor: '#007AFF',
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginLeft: 6,
            }}
          >
            <MaterialIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={startVoiceRecording}
            style={{
              backgroundColor: '#007AFF',
              borderRadius: 50,
              padding: 12,
              marginLeft: 6,
            }}
          >
            <MaterialIcons name="keyboard-voice" size={22} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
