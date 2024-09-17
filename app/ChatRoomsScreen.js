import React, {useEffect, useState} from "react";
import {getChatRooms} from './API/ClientAPI';
import { useAuth } from "./AuthContext";
import { ScrollView, View } from "react-native";
import Rooms from "../components/Rooms";


const ChatRoomsScreen =()=>{
    const {authState}= useAuth();
    const [rooms, setRooms]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
   
        const fetchRooms= async()=>{
         try{
            const res= await getChatRooms(authState.accessToken);
             console.log("res of getChatRooms", res);
             setRooms(res);

         }catch(e){
  console.log("err of getChatRooms", e);
  alert("error", e);
         }
        };fetchRooms();
    }, [authState.accessToken])


    return(
       <ScrollView>
        <View>
         <Rooms rooms={rooms}/>


        </View>
       </ScrollView>
    )
 
}



export default ChatRoomsScreen;