import React, {useEffect,useState} from "react";
import {ScrollView, Container, View, Button, StyleSheet ,Text} from 'react-native';
import { getPurchasingHistory } from "./API/ClientAPI";
import { useAuth } from "./AuthContext";
import Order from "../components/Order";
import MainView from "../components/MainView";


const OrderScreen = ()=>{

    const [orders, setOrders]= useState([]);
    const {authState}= useAuth();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await getPurchasingHistory(authState.accessToken);
                console.log("Response of get purchasing history inside screen", response);
                setOrders(response);
            } catch (error) {
                console.log("Error fetching orders", error);
            }
        };
        fetchOrder();
    }, [authState.accessToken]);

    return(
        <MainView>
       <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.title}>Your Orders:</Text>
                    <Order orders={orders}/>
                </View>
            </ScrollView>
        </View>
        </MainView>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        justifyContent:'flex-start',
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#a1E533',
        
        padding: 10,
        borderRadius: 10,
        marginTop:10,
    }
})
export default OrderScreen;