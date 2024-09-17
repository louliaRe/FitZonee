import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { SearchBar, Modal } from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import MainView from '../../components/MainView';
import Product from '../../components/Product';
import CartDisplay from '../../components/CartDisplay';
import PublicStore from '../../components/PublicStore'; 
import PrivateStore from '../../components/PrivateStore';

import { useAuth } from '../AuthContext';



const Store = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'private', title: 'Private Store' },

    { key: 'public', title: 'Public Store' },
  ]);

  const renderScene = SceneMap({
    public: PublicStore, 
    private: PrivateStore,
  });

  return (
    <MainView>
      <Image source={require('../../assets/images/store.jpeg')} style={styles.img} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: '#2C2C2C' }} indicatorStyle={{ backgroundColor: '#8ee53f' }} />
        )}
      />
      <View style={styles.cartDisplayContainer}>
        <CartDisplay />
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 10,
  },
  img: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchBar: {
    marginBottom: 10,
    height:45,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartDisplayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 10,
  },
});

export default Store;
