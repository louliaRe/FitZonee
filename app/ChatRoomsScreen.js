import React, {useEffect, useState} from "react";
import {getChatRooms} from './API/ClientAPI';
import { useAuth } from "./AuthContext";
import { ScrollView, View, StyleSheet } from "react-native";
import Rooms from "../components/Rooms";


const ChatRoomsScreen = () => {
    const {authState} = useAuth();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await getChatRooms(authState.accessToken);
                console.log("Chat Rooms Response", res);
                setRooms(res);
            } catch (error) {
                console.log("Error fetching chat rooms", error);
                alert("Error fetching chat rooms");
            }
            setLoading(false);
        };

        fetchRooms();
    }, [authState.accessToken]);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Rooms rooms={rooms} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#1E1E1E', // Dark background for contrast
    },
});

export default ChatRoomsScreen;