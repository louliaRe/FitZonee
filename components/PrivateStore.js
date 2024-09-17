import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { Searchbar, Modal } from 'react-native-paper';
import { getPrivateProducts, getPublic } from '../app/API/ClientAPI';
import Product from './Product';
import PrivateProduct from './PrivateProduct';
import { useAuth } from '../app/AuthContext';
import OffersBanner from './OffersBanner';
import { useRouter } from 'expo-router';

const PrivateStore = () => {
    const { authState } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [offers,setOffer]= useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchPrivate = async () => {
      try {
        const res = await getPrivateProducts(authState.accessToken, authState.branch_id);
        console.log('Private product details:', res.products);
        setProducts(res.products);
        setOffer(res.offers);
        setLoading(false);

      } catch (e) {
        console.log("err", e);
        setLoading(false);

      }
    };
  
    fetchPrivate();
  }, []);

  const handleOffer =  () => {
    setLoading(true); 
    console.log("sss", offers)
   
      
      router.push({
        pathname: '/Offers',
        params: { offers: JSON.stringify(offers) }
      });
    }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#8ee53f" />
      </View>
    );
  }
  const groupByBaseProductId = (products) => {
    return products.reduce((acc, product) => {
      const { base_product_id } = product;
      if (!acc[base_product_id]) {
        acc[base_product_id] = [];
      }
      acc[base_product_id].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByBaseProductId(products); // Call the grouping function here

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <OffersBanner onClick={handleOffer}/>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {Object.keys(groupedProducts).map((baseProductId) => (
          <PrivateProduct 
            key={baseProductId} 
            products={groupedProducts[baseProductId]} 
          />
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent:'flex-start'
  },
  searchBar: {
    marginBottom: 5,
    height:45,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrivateStore;
