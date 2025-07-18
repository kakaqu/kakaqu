import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getShopById } from '../services/get/getShopById';
import getLanguageCode from '../../../shared/services/getLanguageCode';


const ShopDashboard = () => {
  const route = useRoute();
  const { shopId } = route.params;

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user?.id);
  const languageId = useSelector((state) => state.user?.languageId);
  const languageCode = getLanguageCode(languageId);

  useEffect(() => {
    const loadShop = async () => {
      setLoading(true);
      const result = await getShopById(shopId, userId, languageCode);
      setShop(result);
      setLoading(false);
    };

    loadShop();
  }, [shopId]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (!shop) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Mağaza bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ShopHeader shop={shop} />
      <ShopStats shop={shop} />
      <ShopActions shop={shop} />
      <ShopAddress address={shop.address} />
    </ScrollView>
  );
};

// ------------------- Alt Bileşenler -------------------

const ShopHeader = ({ shop }) => (
  <View>
    {shop.cover && (
      <Image source={{ uri: shop.cover }} style={{ width: '100%', height: 180 }} resizeMode="cover" />
    )}
    <View style={{ flexDirection: 'row', padding: 16 }}>
      <Image source={{ uri: shop.logo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
      <View style={{ marginLeft: 16, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{shop.name}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>{shop.category}</Text>
      </View>
    </View>
    <Text style={{ paddingHorizontal: 16, fontSize: 14, marginBottom: 8 }}>{shop.description}</Text>
  </View>
);

const ShopStats = ({ shop }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
    <StatBox label="Puan" value={shop.rating} />
    <StatBox label="Takipçi" value={shop.subscriberCount} />
    <StatBox label="Yorum" value={shop.commentCount} />
  </View>
);

const StatBox = ({ label, value }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{value}</Text>
    <Text style={{ fontSize: 12, color: 'gray' }}>{label}</Text>
  </View>
);

const ShopActions = ({ shop }) => {
  const [subscribed, setSubscribed] = useState(shop.isSubscribed);

  const handleSubscribe = () => {
    // TODO: API çağrısı ile takip işlemi yapılabilir
    setSubscribed(!subscribed);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 }}>
      <TouchableOpacity style={buttonStyle} onPress={handleSubscribe}>
        <Text style={buttonText}>{subscribed ? 'Takiptesin' : 'Takip Et'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttonStyle}>
        <Text style={buttonText}>Yorum Yaz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={buttonStyle}>
        <Text style={buttonText}>Haritada Gör</Text>
      </TouchableOpacity>
    </View>
  );
};

const ShopAddress = ({ address }) => (
  <View style={{ padding: 16 }}>
    <Text style={{ fontWeight: 'bold' }}>Adres:</Text>
    <Text>{address?.line}</Text>
    <Text>{`${address?.districtName}, ${address?.provinceName}`}</Text>
  </View>
);

// ------------------- Stil Tanımları -------------------

const buttonStyle = {
  backgroundColor: '#007AFF',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
};

const buttonText = {
  color: 'white',
  fontWeight: 'bold',
};

export default ShopDashboard;
