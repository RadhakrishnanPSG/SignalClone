import { Avatar, ListItem } from "react-native-elements"
import React, { useEffect, useState } from "react"
import {StyleSheet, View, Text} from "react-native";
import { db } from "../firebase";
const CustomListItem = ({id , chatName, enterChat}) =>{

    const [chatMessages,setchatMessages] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot(snapshot => 
            setchatMessages(snapshot.docs.map(doc => doc.data())
        ));

        return unsubscribe;
    })

    return (
        <ListItem key={id} bottomDivider onPress={() => enterChat(id,chatName)}>
            <Avatar rounded source={{uri : chatMessages?.[0]?.photoURL ||"https://upload.wikimedia.org/w7y6ikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}}/>
            <ListItem.Content>
                <ListItem.Title style={{fontWeight : "800"}}>{chatName}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">{chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem