import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { Auth } from "firebase/auth";
import { auth } from "../firebase";
 
const loginScreen = ({ navigation }) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const signIn = () => {
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error));
}

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
            navigation.replace("Home");
        }
    });

    return unsubscribe;
    
},[auth]);

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="auto"/>
                <Image source={{
                    uri:"https://signal.org/assets/og/og-image-ff2096df535eee499356de64b19fa8cebb9681ab1e78cca7330e7f8b8d5ec6d5.png"
                }}
                style={{width : 400, height : 200}}
                />

            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>
            </View>

            <Button title="Login" containerStyle={styles.button} onPress={signIn}/>
            <View style={{height : 10}}/>
            <Button title="Register" type="outline" containerStyle={styles.button} onPress={() => navigation.navigate("Register")}/>

        </KeyboardAvoidingView>

        
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        padding : 10,
        backgroundColor : "white",
    },
    inputContainer : {
        width : 300,
    },
    button : {
        width : 200,
        marginTop : 10,
    }
  });