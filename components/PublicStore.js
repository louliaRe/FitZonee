import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { Searchbar, Modal } from 'react-native-paper';
import { getPublic } from '../app/API/ClientAPI';
import Product from './Product';
import { useAuth } from '../app/AuthContext';
import OffersBanner from './OffersBanner';
import { useRouter } from 'expo-router';

const PublicStore = () => {
    const { authState } = useAuth();
    const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [offers, setOffer] = useState([]);

  useEffect(()=>{
    setLoading(true);
    const fetchPublic = async ()=>{
        try{
          const response = await getPublic(authState.accessToken);
          console.log("res of get public products", response);
          setProducts(Object.values(response.products));
          setLoading(false);
        } catch (e){
          console.log("err of get public products", e);
          setLoading(false);
        }
        
    }
    fetchPublic();
   
  },[])

console.log("products after", products);

const handleOffer = async () => {
  setLoading(true);
  try {
    const res = await getPublic(authState.accessToken);
    const offers = res.offers;

    setOffer(offers);

    router.push({
      pathname: '/Offers',
      params: { offers: JSON.stringify(offers) }
    });
  } catch (e) {
    console.log('error', e);
  } finally {
    setLoading(false);
  }
};


const handleProduct=(id)=>{
  setVisible(true);
}


 
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
        {products.map((product) => (
          <Product key={product.id} product={product}  onClick={()=>{handleProduct(product.id)}}/>
        ))}
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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

export default PublicStore;
