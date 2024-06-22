import React, { useEffect,useState } from 'react';
import {Text, StyleSheet,View,ScrollView,Image, FlatList,ActivityIndicator} from "react-native";
import Product from '@/components/Product';
import MainView from '@/components/MainView';
import { useCart, CartProvider } from '@/components/Cart';
import CartDisplay from '@/components/CartDisplay';
import { Searchbar } from 'react-native-paper';



const store: React.FC=()=>{
    const [products, setProducts] = useState([]);
    const [cart, setCart]= useState([])
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');



  // useEffect(() => {
  //   // Fetch product data from your backend API
  //   // Replace with actual API call
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('your_backend_api/products');
  //       const data = await response.json();
  //       setProducts(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
    const sampleProduct = {
        name: 'Example',
        price: 29.99,
        image: ('@/assets/images/woman.jpg'), 
      };
      

      // if (loading) {
      //   return (
      //     <View style={styles.loaderContainer}>
      //       <ActivityIndicator size="large" color="#a9f368" />
      //     </View>
      //   );
      // }
    
      return (
        <MainView>
          <CartProvider>
        <ScrollView style={styles.container}>
          
                    <Image
            source={require('@/assets/images/store.jpeg')}
            style={styles.img}
          />
          
          <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
          {/* <View style={styles.productContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}  //keyExtractor function ensures each product has a unique key by converting the product's id to a string.
              renderItem={({ item }) => <Product product={item} />}
            />
          </View> */}
          <View style={styles.productContainer}>
          <Product product={sampleProduct} />
          </View>
          
<CartDisplay/>
        </ScrollView>
        </CartProvider>
        </MainView>
      );
    };
const styles= StyleSheet.create({
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
      },
      container: {
        flex: 1,
      },
      productContainer: {
        paddingHorizontal: 2,
        marginTop: 5,
      },
      header: {
        alignItems: 'center',
        marginVertical: 20,
      },
        loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})
export default store;



