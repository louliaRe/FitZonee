import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Modal, Button,TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import OfferCard from '../components/OfferCard';
import { publicOfferDetails } from '../app/API/ClientAPI'; 
import { useAuth } from './AuthContext';
import { useCart } from '../components/Cart';
import CartDisplay  from '../components/CartDisplay';
import MainView from '../components/MainView';

const Offers = () => {
  const { authState } = useAuth(); 
  const { addToCart, removeFromCart } = useCart(); 
  const { offers: offers } = useLocalSearchParams();
  const offersParam = JSON.parse(offers);
  console.log("off in offers", offersParam);
  const [loading, setLoading] = useState(false);
  const [selectedOfferDetails, setSelectedOfferDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [quantities, setQuantities] = useState({});

  const handleOfferClick = async (offer_id) => {
    setLoading(true);
    
    try {
      const offerDetails = await publicOfferDetails(authState.accessToken, offer_id);
      setSelectedOfferDetails(offerDetails);
      setModalVisible(true);
      console.log("Offer Details", offerDetails);

    //   console.log("offer after click on it details", selectedOfferDetails.price_offer_details.price_offers_products.map(pro=>pro.product))

    } catch (error) {
      console.log("Error fetching offer details", error);
    } finally {
      setLoading(false);

    }
  };

  console.log("offer after click on it details", selectedOfferDetails? selectedOfferDetails: null)

  const getUniqueOffers = (offers) => {
    const uniqueOffersMap = {};
    
    offers.forEach((offer) => {
      // If an offer with the same offer_id doesn't already exist, add it
      if (!uniqueOffersMap[offer.offer_id]) {
        uniqueOffersMap[offer.offer_id] = offer;
      }
    });

    return Object.values(uniqueOffersMap); // return array of unique offers
  };

  // Get the unique offers
  const uniqueOffers = getUniqueOffers(offersParam);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOfferDetails(null); // Clear selected offer details
  };

  const handleIncrementQuantity = ( offer_id, branchId,price, offerName) => {
    console.log("offer_id: " + offer_id)
    const newQuantity = (quantities[offer_id] || 0) + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [offer_id]: newQuantity,
    }));

    // Add product to the cart
    addToCart({
      offer_id: offer_id,
      amount: newQuantity,
      branch_id: branchId,
      price,
      name: offerName,
    });
  };

  const handleDecrementQuantity = (offer_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [offer_id]: Math.max(1, (prevQuantities[offer_id] || 0) - 1),
    }));
    removeFromCart({})
  };



  return (
    <MainView>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.offerList}>
        {uniqueOffers.map((offer, index) => (
          <OfferCard key={index} offer={offer} onOfferClick={handleOfferClick} />
        ))}
      </ScrollView>
      <View style={styles.cartDisplayContainer}>
        <CartDisplay />
      </View>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#8ee53f" />
        </View>
      )}

      {/* Modal to show selected offer details */}
      {selectedOfferDetails && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Offer Details</Text>

              {/* <Text style={styles.modalText}>
                Offer ID: {selectedOfferDetails.price_offer_details.offer_id}
              </Text> */}
              <Text style={styles.modalText}>
                Branch: {selectedOfferDetails.price_offer_details.branch}
              </Text>
              <Text style={styles.modalText}>
                Price: ${selectedOfferDetails.price_offer_details.price}
              </Text>
              <Text style={styles.modalText}>
                Start Date: {selectedOfferDetails.price_offer_details.start_date}
              </Text>
              <Text style={styles.modalText}>
                End Date: {selectedOfferDetails.price_offer_details.end_date}
              </Text>

              <Text style={styles.modalSubTitle}>Products in Offer:</Text>
              {selectedOfferDetails.price_offers_products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <Text style={styles.modalText}>
                    Product Name: {product.product.name}
                  </Text>
                  <Text style={styles.modalText}>
                    Description: {product.product.description}
                  </Text>
                  <Text style={styles.modalText}>
                    Flavor: {product.flavor}
                  </Text>
                  <Text style={styles.modalText}>
                    Weight: {product.weight} kg
                  </Text>
                  <Text style={styles.modalText}>
                    Calories: {product.calories} kcal
                  </Text>

                  {/* Quantity Controls */}
                 
                </View>
              ))}

                <View style={styles.quantityContainer}>
                    <Button
                      title="-"
                      color="#a1E533"
                      onPress={() => handleDecrementQuantity(selectedOfferDetails.offer_id)}
                    />
                    <Text style={styles.quantityText}>
                      {quantities[selectedOfferDetails.offer_id] || 1}
                    </Text>
                    <Button
                      title="+"
                      color="#a1E533"
                      onPress={() =>
                        handleIncrementQuantity(
                            selectedOfferDetails.price_offer_details.offer_id,
                          selectedOfferDetails.price_offer_details.branch,
                          selectedOfferDetails.price_offer_details.price,
                          selectedOfferDetails.name
                        )
                      }
                    />
                  </View>

              {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      )}
    </View>
    </MainView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  offerList: {
    paddingVertical: 10,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2c2c2c',
    color: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    color: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#a1E533",
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color:"#a1E533",

  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color:"#ffffff",

  },
  productItem: {
    color:'#FFFFFF',
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
    color:'#FFFFFF',
  },
  closeButton: {
    backgroundColor: '#8ee53f',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
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


export default Offers;
