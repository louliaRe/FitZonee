import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import { Card, Button } from 'react-native-paper'
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import {  CartProvider, useCart } from './Cart';

interface ProductProps {
    product: {
      name: string;
      price: number;
      image: string;
    };
  }

const Product: React.FC<ProductProps> = ({ product }) => {
    const [quantity, setQuantity]= useState(0)
    const { addToCart, removeFromCart } = useCart();

    const incrementQ=()=>{
        setQuantity(quantity+1)
        addToCart(product)
    }
    const decrementQ=()=>{
        if (quantity>0){
        setQuantity(quantity-1)
        removeFromCart(product)
        }
    }
 
    
    return (
        <Card style={styles.card}>
          
                <View style={styles.cardContent}>

          <Card.Cover source={{ uri: product.image }} style={styles.image} />
          <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.row}>
          <Text style={styles.price}>${product.price}</Text>
            <View style={styles.quantityContainer}>
            <TouchableOpacity
                onPress={decrementQ}
                style={styles.quantityButton}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQ}
                style={styles.quantityButton}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            </View>
            </View>
          </View>
        </Card>
      );
    };
    
    const styles = StyleSheet.create({
      card: {
        flex: 1,
        marginTop: 2,
        width: 353,
        height: 110,
        backgroundColor: '#2C2C2C',
      },
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      details: {
        flex: 1,
        paddingHorizontal: 10,
      },
      image: {
        resizeMode: 'contain',
        margin: 5,
        height: 100,
        width: 100,
      },
      content: {
        flex: 1,
        paddingHorizontal: 10,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom:5,
      },
      price: {
        fontSize: 14,
        color: '#fff',
        marginTop:10,
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:30,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      quantityButton: {
        marginHorizontal: 10,
        backgroundColor: '#8ee53f',
        width: 25,
        height: 25,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
      },
      quantityText: {
       
        fontSize: 16,
        color: '#fff',
      },
    });
    export default Product; 