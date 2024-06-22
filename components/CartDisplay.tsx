import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useCart } from './Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import CartDetails from "@/app/CartDetails";

const CartDisplay = () => {
  const { cart, getTotalPrice,addToCart, removeFromCart } = useCart();
  const router = useRouter();


  const handleBuying=()=>{
    router.push('/CartDetails');
  }


  if (!cart.length) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
        <Icon name="cart-outline" size={30} color="#fff" style={styles.cartIcon} />
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        
        <View style={styles.row}>
      <Icon name="cart-outline" size={30} color="#fff" style={styles.cartIcon} />
   
      <Text style={styles.totalPriceT}>Total Price:</Text>
      <Button  mode="contained" onPress={handleBuying} style={styles.btn}>Buy</Button>
      </View>
      <Text style={styles.totalPrice}> ${getTotalPrice()}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'100%',
  padding: 30,
  backgroundColor: '#2C2C2C',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  shadowColor:'#a9f368',
  shadowOpacity: 10,
  shadowRadius: 5,
  elevation: 5, 

  },
  emptyCartText: {
    fontSize: 17,
   marginRight:50,
    color:'#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cartIcon: {
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    
  },
  
  totalPriceT: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight:160,

    color:'#fff',
  },
  totalPrice: {
    fontSize: 15,
    marginTop: 5,
    marginLeft:50,
    color:'#fff',
  },
  btn:{
    position:'absolute',
    marginLeft:'75%',

    backgroundColor:'#a9f368',
    
  }
});

export default CartDisplay;
