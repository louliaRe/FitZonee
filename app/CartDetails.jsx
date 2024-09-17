import React,{useEffect, useState} from "react";

import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart}  from '../components/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import MainView from "../components/MainView";
import {buyPrivateProduct, buyPublicProduct} from './API/ClientAPI';
import { useAuth } from "./AuthContext";




const CartDetails=()=>{
    const { cart, getTotalPrice, removeFromCart, addToCart, clearCart } = useCart();
    const router = useRouter();
    const {authState}= useAuth();
    const [voucher, setVoucher]=useState("");

    useEffect(() => {
      console.log(cart); 
  }, [cart]); 

  const handleVoucher=()=>{
    addToCart({ voucher})
  }

  const handleBuy = async () => {
    let isPrivateProduct = false;

    // Separate products and price offers from the cart
    const products = [];
    const price_offers = [];
  
    cart.forEach((item) => {
      if (item.offer_id) {
        // If the item has an offer_id, it's a price offer
        price_offers.push({
          offer_id: item.offer_id,
          amount: item.amount,
          branch_id: item.branch_id,
        });
      } else if (item.branch_product_id && item.isPrivateProduct){
        isPrivateProduct = true;
        //  product from private
        products.push({
          branch_product_id: item.branch_product_id,
          amount: item.amount,
         
        });
      }
      else if (item.branch_product_id) {
         //  product from public
        products.push({
          branch_product_id: item.branch_product_id,
          amount: item.amount,
          branch_id: item.branch_id,
        });
      }
    });
  
    
    const payload = {
      products,
      price_offers,
      vouchers: voucher ? [voucher] : [],  
    };
  
    console.log("Payload for purchase:", JSON.stringify(payload));
  
    try {
     if(isPrivateProduct){
        const res = await buyPrivateProduct(authState.accessToken, authState.branch_id, payload)
        console.log("Private purchase response:", res);
        alert('Your order has been successfully!, thanks for your trust <3');
        clearCart();

     }else{
      const res = await buyPublicProduct(authState.accessToken, payload);
      console.log(" PublicPurchase response:", res);
      alert('Your order has been successfully!, thanks for your trust <3');
      clearCart();
     }
    } catch (error) {
      console.error("Error purchasing products:", error);
      alert('Error purchasing products, please try again.', error);
      clearCart();
    }
  };
  return (
    <MainView>     
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="cart-outline" size={30} style={styles.cartIcon} />
                <Text style={styles.title}>Cart Items</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {cart.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => removeFromCart(item)}>
                                <Icon name="remove-circle-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.amount}</Text>
                            <TouchableOpacity onPress={() => addToCart(item)}>
                                <Icon name="add-circle-outline" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.itemPrice}>${(item.price * (item.amount || 0))}</Text>
                    </View>
                ))}
            </ScrollView>
            <TextInput
            label="Voucher:"
            textColor='#fff'
            value={voucher}
            onChangeText={setVoucher}
            style={styles.input}
            autoFocus
            labelStyle={{ color: '#a1E533' }}

            theme={{
              colors: {
                primary: '#a1E533', // the outline color when focused
                text: '#fff', 
                label:'#fff',

              },
            }}></TextInput><Button onPress={handleVoucher}>done</Button>
            <Text style={styles.totalPrice}>Total Price: ${getTotalPrice()}</Text>
            <Button mode="contained" onPress={() => handleBuy()} style={styles.checkoutButton}>
                Checkout
            </Button>
        </View>
    </MainView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C2C',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
},
cartIcon: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
},
title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
},
scrollView: {
    flexGrow: 1,
},
itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
},
itemText: {
    fontSize: 16,
    color: '#fff',
    flex: 2,
},
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
},
quantityText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 10,
},
itemPrice: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'right',
},
totalPrice: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
},
input: {
    marginBottom: 10,
    backgroundColor: '#444',
    borderStartColor:'#a1E533'
    
  },
checkoutButton: {
    marginTop: 20,
    backgroundColor: '#a1E533',
},
});


export default CartDetails;