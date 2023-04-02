import React, { useLayoutEffect, useState } from "react";
import {StyleSheet, View, Text} from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "@rneui/themed";
import { db } from "../firebase";
const addChat = ({navigation}) => {

    const[input,setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Add a new chat",
        })
    },[navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName : input
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error));
    }

    return(
        <View style={styles.container}>
            <Input placeholder="Enter chat name" value={input} onChangeText = {text => setInput(text)} leftIcon={
                <Icon name="MessageOutlined" type="antdesign" size={24} color="black"/>
            } onSubmitEditing={createChat}/>
            <Button disabled={!input} onPress={createChat} title="Create new chat"/>
        </View>
    );
 };

 export default addChat

 const styles = StyleSheet.create({
    container : {
        backgroundColor:"white",
        padding: 30,
        height:"100%",
    },
 });