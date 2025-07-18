import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import TopBar from '../../navigation/TopBar';
import CustomTheme from '../../../shared/styles/CustomThems';
import ShopCard from '../components/ShopCard';
import { fetchAllShops } from '../services/get/fetchAllShops';
import getLanguageCode from '../../../shared/services/getLanguageCode';
import { useTranslation } from 'react-i18next';

const MarketScreen = () => {
  const [shops, setShops] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [expandedShopId, setExpandedShopId] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();

  const userId = useSelector((state) => state.user?.id);
  const languageId = useSelector((state) => state.user?.languageId);
  const languageCode = getLanguageCode(languageId);

  const handleShopStatusChange = ({ shopId, type, isSubscribed }) => {
    if (type === 'block') {
      setShops((prev) => prev.filter((shop) => shop.id !== shopId));
    }
    if (type === 'subscribe') {
      setShops((prev) =>
        prev.map((shop) =>
          shop.id === shopId ? { ...shop, isSubscribed } : shop
        )
      );
    }
  };

  const mergeUniqueShops = (oldShops, newShops) => {
    const map = new Map();
    [...oldShops, ...newShops].forEach(shop => {
      if (shop?.id) map.set(shop.id, shop);
    });
    return Array.from(map.values());
  };

  const loadShops = useCallback(async () => {
    if (!userId || loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchAllShops({
        userId,
        page,
        limit: 20,
        searchQuery: debouncedSearchText,
        languageCode,
      });
      if (page === 0) {
        setShops(result);
      } else {
        setShops((prev) => mergeUniqueShops(prev, result));
      }

      setHasMore(result.length === 20);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId, page, debouncedSearchText, languageCode]);

  // DEBOUNCE SEARCH
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchText]);

  // FETCH ON SEARCH TEXT CHANGE
  useEffect(() => {
    if (!userId) return;
    setPage(0);
    setHasMore(true);
    loadShops();
  }, [debouncedSearchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = async () => {
    if (!userId) return;
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    try {
      const result = await fetchAllShops({
        userId,
        page: 0,
        limit: 20,
        searchQuery: debouncedSearchText,
        languageCode,
      });
      setShops(result);
    } catch (err) {
      setError(err);
    } finally {
      setRefreshing(false);
    }
  };

  const renderFooter = () => {
    if (!loading || refreshing) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#999" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.centered}>
        <Text>{t('market_screen.no_shops')}</Text>
      </View>
    );
  };

  
const handleToggleExpand = (shopId) => {
  setExpandedShopId(prev => (prev === shopId ? null : shopId));
};

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        title={t('market_screen.title')}
        showSearch
        onSearch={handleSearch}
        searchPlaceholder={t('market_screen.search_placeholder')}
      />
      <View style={styles.inner}>
        <FlatList
          data={shops}
          keyExtractor={(item, index) => item?.id?.toString() || `fallback-${index}`}
          renderItem={({ item }) => (
          <ShopCard
            shop={item}
            t={t}
            onShopStatusChange={handleShopStatusChange}
            isExpanded={expandedShopId === item.id}
            onToggleExpand={() => handleToggleExpand(item.id)}
          />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.background,
  },
  inner: {
    flex: 1,
    marginBottom: 80,
  },
  list: {
    padding: 16,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 10,
  },
});
