import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

 const Order = ({ orders }) => {

    console.log("Order", orders);
  return (
      <View style={styles.container}>
      {orders.map((order, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Order #{order.purchase_id}</Title>
            <Paragraph style={styles.paragraph}>
              <FontAwesome name="money" size={18} color="green" /> Total Price: ${order.total}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              <MaterialIcons name="date-range" size={18} color="blue" />  {new Date(order.created_at).toLocaleDateString()}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              <MaterialIcons name={order.is_public ? "public" : "lock"} size={18} color={order.is_public ? "green" : "red"} />
              {order.is_public ? " Public Store" : " Private Store"}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              <FontAwesome name="refresh" size={18} color="orange" /> Updates: {order.number_of_updates}
            </Paragraph>
          </Card.Content>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width:'100%',
    marginVertical: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 5,
    backgroundColor:'#2c2c2c',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#dddddd',
    marginBottom: 5,
  },
});
export default Order;
