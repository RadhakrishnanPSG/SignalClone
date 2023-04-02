import React, { useState } from "react";
import { useLayoutEffect } from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import {auth,db} from "../firebase"
import firebase from "firebase/compat/app";

const chatScreen = ({navigation,route}) =>{

    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Chat",
            headerTitleAlign:"left",
            headerTitle : () => (
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Avatar rounded source={{uri: messages[0]?.data.photoURL}}/>
                    <Text style={{color:"white",marginLeft:10,fontWeight:500}}>{route.params.chatName}</Text>
                </View>
            ),

            headerRight : () => (
                <View style={{flexDirection:"row",justifyContent:"space-between",width:80,marginRight:20,}}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
        });
        setInput("");

    };

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy("timestamp","asc").onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));

        return unsubscribe;
    },[route])

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
            <StatusBar style="auto"/>
            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop:15}}>
                            {messages.map(({id,data}) => (
                                data.email ===auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar  containerStyle={{position:"absolute",bottom:-15,right:-5,}} rounded   right={-5} size={30} source={{uri:data.photoURL}}/>
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ): (
                                    <View style={styles.sender}> 
                                        <Avatar  containerStyle={{position:"absolute",bottom:-15,right:-5,}} rounded   right={-5} size={30} source={{uri:data.photoURL}}/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput value={input} onChangeText={text =>setInput(text)} onSubmitEditing={sendMessage} placeholder="Message" style={styles.textInput}/>
                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="blue"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default chatScreen

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"flex-end"
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15,
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"white",
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    receiver:{
        padding:15,
        backgroundColor:"lightgrey",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
        borderColor:"black",
    },
    sender:{
        padding:15,
        backgroundColor:"lightblue",
        alignSelf:"flex-start",
        borderRadius:20,
        margin:15,
        maxWidth:"80%",
        position:"relative",
        borderColor:"black",
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"black",
    },
    senderText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,
    },
    receiverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
    }
});