import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../shared/slices/globalModalSlice';
import CustomTheme from '../../../shared/styles/CustomThems';
import { getLastTransactions } from '../../user/services/gets/getLastTransactions';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import { convertToAfghanDate, formatTime12Hour } from '../../../shared/utils/date/dateConverter';
import { useNavigation } from '@react-navigation/native';



export default function LastGoldTransactionsModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const languageId = useSelector((state) => state.user.languageId);
  const { items, loading, error } = useSelector((state) => state.transactions);
  const navigation = useNavigation();

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

  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.row}>
        <Text style={[styles.amount, { color: getColor(item.type) }]}>
          {item.type === 'out' ? '-' : '+'}{item.amount}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.date}>
            {formatTime12Hour(item.date)}  ___  {convertToAfghanDate(item.date)}
          </Text>
        </View>
      </View>
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

    if (!items?.length) {
      return (
        <Text style={styles.emptyText}>
          {t('transactions.nothingFound') || "Hiçbir şey bulunamadı."}
        </Text>
      );
    }

    return (
      <>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
        <CustomButton
          buttonText={t('transactions.seeAll') || "Tümünü Gör"}
          onPress={() => {
            dispatch(hideModal());
          }}

          style={styles.showAllCustomButton}
        />
      </>
    );
  };

  return (
    <View style={styles.modal}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("transactions.title")}</Text>
        <TouchableOpacity onPress={() => dispatch(hideModal())}>
          <Ionicons name="close" size={24} color={CustomTheme.colors.black} />
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: CustomTheme.colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: CustomTheme.colors.black,
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  descriptionContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    color: CustomTheme.colors.text,
  },
  date: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
    paddingVertical: 24,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
  },
  showAllCustomButton: {
    marginTop: 12,
    alignSelf: 'center',
    width: '100%',
  },
});
