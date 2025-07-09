import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import CustomTheme from '../../../shared/styles/CustomThems';
import { convertToAfghanDate, formatTime12Hour } from '../../../shared/utils/date/dateConverter';
import { getLastTransactions } from '../../user/services/gets/getLastTransactions';
import styles from '../styles/goldTransactionsStyles';

const TABS = ['all', 'in', 'out', 'system'];

export default function goldTransactionsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const userId = useSelector((state) => state.user.id);
  const languageId = useSelector((state) => state.user.languageId);
  const { items, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (userId && languageId) {
      dispatch(getLastTransactions({ userId, languageId, t }));
    }
  }, [userId, languageId]);

  const getColor = (type) => {
    switch (type) {
      case 'in': return CustomTheme.colors.accent;
      case 'out': return CustomTheme.colors.secondary;
      case 'system': return CustomTheme.colors.primary;
      default: return CustomTheme.colors.text;
    }
  };

  const filteredItems = items
    ?.filter((item) => activeTab === 'all' || item.type === activeTab)
    ?.filter((item) =>
      item.description?.toLowerCase().includes(search.toLowerCase())
    );

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.row}>
        <Text style={[styles.amount, { color: getColor(item.type) }]}>
          {item.type === 'out' ? '-' : '+'}{item.amount}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {convertToAfghanDate(item.date)} - {formatTime12Hour(item.date)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {TABS.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => setActiveTab(type)}
          style={[
            styles.tabButton,
            activeTab === type && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === type && styles.activeTabText,
            ]}
          >
            {t(`transactions.tabs.${type}`)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
          <Text style={styles.loadingText}>{t('info.loading')}</Text>
        </View>
      );
    }

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (!filteredItems?.length) {
      return (
        <Text style={styles.emptyText}>
          {t('transactions.nothingFound')}
        </Text>
      );
    }

    return (
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('transactions.title')}</Text>
        <Ionicons name="search" size={20} color={CustomTheme.colors.gray} />
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={t('transactions.search') || 'Ara...'}
        style={styles.searchInput}
        placeholderTextColor="#888"
      />

      {renderTabs()}
      {renderContent()}
    </SafeAreaView>
  );
}
