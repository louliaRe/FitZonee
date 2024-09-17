import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useCart } from './Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";

const CartDisplay = () => {
  const { cart, getTotalPrice } = useCart();
  const router = useRouter();

  const handleBuying = () => {
    router.push('/CartDetails');
  };

  if (!cart.length) {
    return null; // Don't render anything if the cart is empty
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="cart-outline" size={20} color="#fff" style={styles.cartIcon} />
        <Text style={styles.totalPriceT}>Total: ${getTotalPrice()}</Text>
        <Button mode="contained" onPress={handleBuying} style={styles.btn}>Buy</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#2C2C2C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#a9f368',
    shadowOpacity: 10,
    shadowRadius: 5,
    elevation: 20,
    zIndex: 1000, //above tab
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartIcon: {
    marginBottom: 0,
  },
  totalPriceT: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn: {
    backgroundColor: '#a1E533',
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
   minWidth:40,
  },
});

export default CartDisplay;
