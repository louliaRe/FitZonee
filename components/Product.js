import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity ,Modal,ActivityIndicator, ScrollView} from 'react-native';
import { Card , Portal, Text, Button, PaperProvider, Provider} from 'react-native-paper';
import { MaterialIcons, FontAwesome } from 'react-native-vector-icons';

import { useCart } from './Cart';
import { useAuth } from '../app/AuthContext';
import {getPrivateProductDetails, getPublicProductDetails} from '../app/API/ClientAPI';

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState({});
  const { addToCart, removeFromCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
 const {authState}= useAuth();
 const [loading, setLoading] = useState(false);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const im='http://192.168.43.228:8000';
  console.log("pro in product", product);

  const handleIncrementQuantity = (branchProductId, branchId, price, name) => {
    const newQuantity = (quantity[branchProductId] || 0) + 1;
  
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [branchProductId]: newQuantity,
    }));
  
    const product = {
      branch_product_id: branchProductId,
      amount: newQuantity,
      branch_id: branchId,
      price: price,
      name,
    };
  
    // Add the product directly to the cart
    addToCart(product);
    
    console.log("Added to cart:", product);
  };

  const handleDecrementQuantity = (branchProductId) => {
    console.log("branchProductId", branchProductId)

    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [branchProductId]: Math.max(1, (prevQuantities[branchProductId] || 0) - 1),
    }));
  };

const handleProduct= async(id)=>{
  
    setLoading(true)
   

    try {
      let res;
      if (product.base_product_id) {
        // If branch_product_id => private product
        res = await getPrivateProductDetails(authState.accessToken, authState.branch_id, id);
        console.log('Private product details:', res);
      } else {
        //   public product
        res = await getPublicProductDetails(authState.accessToken,id);
        console.log('Public product details:', res);
      }
  
      setProductDetails(res);  // Save product details (if needed)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      showModal();
    }
  };




if (loading) {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#8ee53f" />
    </View>
  );
}

  return (
    <>

    <Card style={styles.card}  onPress={() => handleProduct(product.base_product_id?product.base_product_id : product.id)} >
      <View style={styles.cardContent}>
        <Card.Cover source={{ uri: `${im}${product.image_path}` }} style={styles.image} />
        
        <View style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <View >
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.description}><Text style={styles.more}>Category: </Text>{product.product_type 
    ? product.product_type 
    : product.category_data && product.category_data.name
  }</Text>
            <Text style={styles.description}><Text style={styles.more}>brand: </Text>{product.brand}</Text>

            </View>
          <View style={styles.row}>

            <Text style={styles.price}>{product.price? `${product.price}$`  : "" }</Text>
            <View style={styles.quantityContainer}>
             
            </View>
          </View>
        </View>
      </View>
    </Card>
    {visible && productDetails && productDetails.category ? (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={hideModal}
    onDismiss={hideModal}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalView}>
        {productDetails ? (
          <ScrollView style={styles.scrollContainer}>
            {/* Product Name */}
            <Text style={styles.modalTitle}>{productDetails.name}</Text>

            {/* Brand */}
            <View style={styles.detailSection}>
              <Text style={styles.label}>
                <MaterialIcons name="branding-watermark" size={16} color="#8ee53f" /> Brand:
              </Text>
              <Text style={styles.value}>
                {productDetails.brand ? productDetails.brand : 'No brand'}
              </Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.label}>
                <MaterialIcons name="category" size={16} color="#8ee53f" /> Category:
              </Text>
              <Text style={styles.value}>
                {productDetails.category ? productDetails.category.name : 'No category'}
              </Text>
            </View>

            {/* Accessories */}
            {productDetails.accessories && productDetails.accessories.length > 0 && (
              <View style={styles.special}>
                <Text style={styles.label}>
                  <FontAwesome name="cogs" size={16} color="#8ee53f" /> Accessory Details:
                </Text>

                {productDetails.accessories.map((accessory, index) => {
                  // Fetch the corresponding branch data based on accessory_id
                  const branchData =
                    productDetails.product_branch_availability[accessory.accessory_id];

                  if (branchData) {
                    return (
                      <View key={index} style={styles.accessoryDetail}>
                        {/* Display accessory details */}
                        <Text style={styles.value}>
                          {`Size: ${accessory.size} , Color: `}
                        </Text>

                        {/* Display color swatch */}
                        <View
                          style={[
                            styles.colorSwatch,
                            { backgroundColor: accessory.color.toLowerCase() },
                          ]}
                        />

                        {/* Display branch product details */}
                        {Object.keys(branchData).map((branchKey) => {
                          const branch = branchData[branchKey].products_data[0];

                          return (
                            <View
                              key={branch.branch_product_id}
                              style={styles.branchDetail}
                            >
                              <Text style={styles.value}>
                                Branch: {branch.branch_address}
                              </Text>
                              <Text style={styles.value}>
                                Price: ${branch.price}
                              </Text>
                              <Text style={styles.value}>
                                Points Gained: {branch.points_gained}
                              </Text>

                              {/* Quantity */}
                              <View style={styles.quantityContainer}>
                                <Button
                                  style={styles.quantityButton}
                                  onPress={() =>
                                    handleDecrementQuantity(branch.branch_product_id)
                                  }
                                >
                                  -
                                </Button>

                                <Text>
                                  {Object.keys(quantity).length === 0 ? (
                                    <Text>No items</Text> // Placeholder if `quantity` is empty
                                  ) : (
                                    <Text>
                                      {quantity[branch.branch_product_id] || 1}
                                    </Text> // Display quantity or fallback to 1
                                  )}
                                </Text>

                                <Button
                                  style={styles.quantityButton}
                                  onPress={() =>
                                    handleIncrementQuantity(
                                      branch.branch_product_id,
                                      branch.branch,
                                      branch.price,
                                      productDetails.name
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  }
                })}
              </View>
            )}

            {/* Display details based on Category */}
            {productDetails.category.name === 'Meal' && productDetails.meals_ ? (
              <View style={styles.special}>
                <Text style={styles.label}>
                  <FontAwesome name="cutlery" size={16} color="#8ee53f" /> Meal Details:
                </Text>
                <Text style={styles.value}>
                  Protein: {productDetails.meals_.protein}g
                </Text>
                <Text style={styles.value}>
                  Calories: {productDetails.meals_.calories} kcal
                </Text>
                <Text style={styles.value}>Carbs: {productDetails.meals_.carbs}g</Text>
                <Text style={styles.value}>Fats: {productDetails.meals_.fats}g</Text>
                <Text style={styles.value}>
                  Used For: {productDetails.meals_.used_for}
                </Text>
              </View>
            ) : productDetails.category.name === 'Supplement' &&
              productDetails.supplements_ &&
              productDetails.supplements_.length > 0 ? (
              <View style={styles.special}>
                <Text style={styles.label}>
                  <FontAwesome name="cogs" size={16} color="#8ee53f" /> Supplement
                  Details:
                </Text>
                {productDetails.supplements_.map((supplement, index) => (
                  <View key={index} style={styles.supplementDetail}>
                    <Text style={styles.value}>
                      <Text style={styles.part}>Flavor: </Text>
                      {supplement.flavor}
                    </Text>
                    <Text style={styles.value}>
                      Protein: {supplement.protein}g
                    </Text>
                    <Text style={styles.value}>
                      Calories: {supplement.calories} kcal
                    </Text>
                    <Text style={styles.value}>Carbs: {supplement.carbs}g</Text>
                    <Text style={styles.value}>
                      Caffeine: {supplement.caffeine} mg
                    </Text>
                    <Text style={styles.value}>Weight: {supplement.weight}g</Text>
                    <Text style={styles.value}>
                      Supplement Category: {supplement.supplement_category.name}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            {/* Availability Section (Branch Data) */}
            {productDetails.product_branch_availability && (
              <View style={styles.special}>
                <Text style={styles.label}>
                  <MaterialIcons name="store" size={16} color="#8ee53f" /> Availability:
                </Text>
                {Object.keys(productDetails.product_branch_availability).map(
                  (branchId, index) => (
                    <View key={index}>
                      {Object.keys(
                        productDetails.product_branch_availability[branchId]
                      ).map((gymKey) => {
                        const gym =
                          productDetails.product_branch_availability[branchId][gymKey];
                        const branchData =
                          productDetails.product_branch_availability[branchId]; // Fetch branchData here
                        return (
                          <View key={gym.gym_id} style={styles.gymInfo}>
                            <Text style={styles.value}>Gym: {gym.gym_name}</Text>
                            {gym.products_data.map((product, i) => (
                              <View key={i} style={styles.productData}>
                                <Text style={styles.value}>
                                  Price: {product.price}$
                                </Text>
                                <Text style={styles.value}>
                                  Points Gained: {product.points_gained}
                                </Text>
                                <Text style={styles.value}>
                                  Branch Address: {product.branch_address}
                                </Text>

                                {/* Quantity Section */}
                                <View style={styles.quantityContainer}>
                                  <Button
                                    style={styles.quantityButton}
                                    onPress={() =>
                                      handleDecrementQuantity(
                                        product.branch_product_id
                                      )
                                    }
                                  >
                                    -
                                  </Button>

                                  <Text>
                                    {Object.keys(quantity).length === 0 ? (
                                      <Text>No items</Text> // Placeholder if `quantity` is empty
                                    ) : (
                                      <Text>
                                        {quantity[product.branch_product_id] || 1}
                                      </Text> // Display quantity or fallback to 1
                                    )}
                                  </Text>

                                  <Button
                                    style={styles.quantityButton}
                                    onPress={() =>
                                      handleIncrementQuantity(
                                        product.branch_product_id,
                                        product.branch,
                                        product.price,
                                        productDetails.name
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                </View>
                              </View>
                            ))}
                          </View>
                        );
                      })}
                    </View>
                  )
                )}
              </View>
            )}
          </ScrollView>
        ) : null}
      </View>
    </View>
  </Modal>
) : null}

</>
)}
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  detailSection: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  special: {
    marginBottom: 10,
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

export default Product;
