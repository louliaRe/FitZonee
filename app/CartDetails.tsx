import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useCart } from '@/components/Cart';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import MainView from "@/components/MainView";



const CartDetails=()=>{
    const { cart, getTotalPrice, addToCart,removeFromCart } = useCart();
    const router = useRouter();


    return (
        <MainView>     
               <View style={styles.container}>
            <View style={styles.header}>
          <Icon name="cart-outline" size={30}  style={styles.cartIcon} />
          <Text style={styles.title}>Cart Items:</Text>
          </View>
          {cart.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name} x {item.quantity}</Text>
          <Text style={styles.itemPrice}>${(item.price * (item.quantity || 0))}</Text>
        </View>
      ))}

      <Text style={styles.totalPrice}>Total Price: ${getTotalPrice()}</Text>
    </View>
    </MainView>

    )
};
const styles=StyleSheet.create({
    container:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center', // Change to 'center' to align items vertically centered
        justifyContent: 'flex-start', // Ensure the icon and text are close to each other
        padding: 10,
      },
    cartIcon:{
        fontWeight:'bold',
        color:'#fff',
    

    },
    title:{
        color:'#fff',
        display:"flex",
        fontWeight:'bold',
        fontSize:22,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        
      },
      itemText: {
        fontSize: 14,
        color:'#fff',
      },
      itemPrice: {
        fontSize: 14,
        color:'#fff',
        display:"flex",
        justifyContent:'flex-start',
        alignItems:'flex-start',
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
})
export default CartDetails;