import React, {useEffect, useState} from "react";
import { View, StyleSheet, TouchableOpacity ,Modal,ActivityIndicator, ScrollView} from 'react-native';
import { Card , Portal, Text, Button, PaperProvider, Provider} from 'react-native-paper';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { useCart } from './Cart';
import { useAuth } from '../app/AuthContext';
import {getPrivateProductDetails} from '../app/API/ClientAPI';


const PrivateProduct = ({ products }) => {
    const [quantity, setQuantity] = useState({});
    const { addToCart, removeFromCart } = useCart();
    const [visible, setVisible] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const { authState } = useAuth();
    const [loading, setLoading] = useState(false);
    const im = 'http://192.168.43.228:8000';
  
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const baseProduct = products[0];

    const handleProduct = async (id) => {
      setLoading(true);
  
      try {
        let res = await getPrivateProductDetails(authState.accessToken, authState.branch_id, id);
        console.log('Private product details:', res);
  
        setProductDetails(res);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        showModal();
      }
    };
  
    const increaseQuantity = (branchProductId, price, name) => {
        const newQuantity = (quantity[branchProductId] || 0) + 1;

        setQuantity((prevQuantities) => ({
            ...prevQuantities,
            [branchProductId]: newQuantity,
          }));
        
          const product = {
            branch_product_id: branchProductId,
            amount: newQuantity,
            price: price,
            name,
            isPrivateProduct: true,
          };
        
          // Add the product directly to the cart
          addToCart(product);
          
          console.log("Added to cart:", product);
        };
      
    
      const decreaseQuantity = (branchProductId) => {
        setQuantity((prev) => ({
          ...prev,
          [branchProductId]: Math.max((prev[branchProductId] || 1) - 1, 0),
        }));
      };
    // Display multiple product variations
    return (
      <>
            {/* Rendering a single card for multiple products under the same base_product_id */}
            <Card style={styles.card} onPress={() => handleProduct(baseProduct.base_product_id)}>
        <View style={styles.cardContent}>
          {/* Display the first product's image */}
          <Card.Cover source={{ uri: `${im}${baseProduct.image_path}` }} style={styles.image} />

          <View style={styles.details}>
            {/* Display the shared details (shown once for all products) */}
            <Text style={styles.name}>{baseProduct.name}</Text>
            <Text style={styles.description}>{baseProduct.description}</Text>
            <Text style={styles.description}>
              <Text style={styles.more}>Category: </Text>{baseProduct.product_type}
            </Text>
            <Text style={styles.description}>
              <Text style={styles.more}>Brand: </Text>{baseProduct.brand || "N/A"}
            </Text>
            <Text style={styles.description}>
              <Text style={styles.price}> {baseProduct.price}$ </Text>
              </Text>
        
          </View>
        </View>
      </Card>

      
        
      {visible && productDetails && productDetails.products && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
        onDismiss={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.scrollContainer}>
              {/* Product Name */}
              <Text style={styles.modalTitle}>{productDetails.name}</Text>

              {productDetails.products.map((product) => (
                <View key={product.branch_product_id} style={styles.productItem}>
                  {/* Dynamic Display for Accessory, Supplement, or Meal */}
                  <Text style={styles.modalText}>Branch: {product.branch_address}</Text>
                  <Text style={styles.modalText}>Price: {product.price}$</Text>
                  {product.product_data.size && (
                    <Text style={styles.modalText}>Size: {product.product_data.size}</Text>
                  )}
                  {product.product_data.color && (
                    <Text style={styles.modalText}>Color: {product.product_data.color}</Text>
                  )}
                  {product.product_data.flavor && (
                    <Text style={styles.modalText}>Flavor: {product.product_data.flavor}</Text>
                  )}
                  {product.product_data.supplement_category && (
                    <Text style={styles.modalText}>
                      Supplement Category: {product.product_data.supplement_category.name}
                    </Text>
                  )}

                  <View style={styles.quantityContainer}>
                    <Button
                      title="-"
                      buttonColor="#a1E533"  
                      textColor="#fff"
                      onPress={() => decreaseQuantity(product.branch_product_id)}
                    >-</Button>
                    <Text style={styles.quantityText}>
                      {quantity[product.branch_product_id] || 0}
                    </Text>
                    <Button
                      title="+"
                      buttonColor="#a1E533"
                      textColor="#fff"
                      onPress={() => increaseQuantity(product.branch_product_id, product.price, product.product_name)}
                    >+</Button>
                  </View>
                </View>
              ))}

              <Button title="Close" onPress={hideModal} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    )}
  </>
)};
  
const styles = StyleSheet.create({
    card: {
      marginBottom: 15,
      backgroundColor: '#2C2C2C',
      borderRadius: 10,
      overflow: 'hidden',
      width:'100%',
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: '#2c2c2c', // Dark background for modal content
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#a1E533", // Green title color
      },
      modalSubTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: "#a1E533",
      },
      modalText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#ffffff", // White text
      },
      productItem: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: '100%',
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
        color: '#FFFFFF',
      },
    
      cartDisplayContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        elevation: 10,
      },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#8ee53f',
      marginRight: 5,
    },
    value: {
      fontSize: 16,
      color: '#fff',
    },
    accessoryDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    part:{
      color:'#61c9af'
    },
    gymInfo: {
      marginBottom: 10,
    },
    productData: {
      marginLeft: 15,
    },
  
  
    details: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    }, 
    description: {
      fontSize: 10,
      color: '#b4b6d6',
      marginBottom: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    price: {
      fontSize: 16,
      color: '#8ee53f',
    },
    more:{
      fontSize: 11,
      color: '#8ee53f',
  
    },
    colorSwatch: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 5,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: '#8ee53f',
      width: 5,
      height: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    quantityText: {
      color: '#fff',
      fontSize: 16,
      marginHorizontal: 10,
    },
  });

export default PrivateProduct;