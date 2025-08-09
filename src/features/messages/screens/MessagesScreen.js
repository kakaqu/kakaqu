import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopBar from '../../navigation/TopBar';
const mockConversations = [
  {
    id: '1',
    title: 'Ahmet Yılmaz',
    lastMessage: 'Selam, nasılsın?',
    lastMessageAt: '2025-07-31T10:00:00Z',
  },
  {
    id: '2',
    title: 'Dükkan ABC',
    lastMessage: 'Ürün hakkında bilgi veririm.',
    lastMessageAt: '2025-07-30T15:20:00Z',
  },
];

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock fetch, sen backend API çağrısına uyarlayabilirsin
  const fetchConversations = useCallback(() => {
    setLoading(true);
    // Simule edelim
    setTimeout(() => {
      setConversations(
        mockConversations.filter(c =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setLoading(false);
    }, 500);
  }, [searchTerm]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatScreen', { conversationId: item.id, title: item.title })}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.title}</Text>
      <Text numberOfLines={1} style={{ color: '#666', marginTop: 4 }}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        title="Mesajlar"
        showSearch
        onSearch={setSearchTerm}
        searchPlaceholder="Mesajlarda ara..."
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default MessagesScreen;
