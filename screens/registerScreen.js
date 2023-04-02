import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const registerScreen = ({navigation}) =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imgUrl,setImgUrl] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName : name,
                photoURL : imgUrl || "https://pixlok.com/wp-content/uploads/2021/10/User-Profile-Icon-9mces.png",
            })
        })
        .catch((error) => alert(error.message));
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <StatusBar style="auto"/>

                <Text h1 style={styles.text}>Create Signal account</Text>

                <View style={styles.inputContainer}>
                    <Input placeholder="Fullname" autoFocus type="text" value={name} onChangeText={(text) => setName(text)}/>
                    <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)}/>
                    <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)}/>
                    <Input placeholder="Profile picture URL( optional )" type="text" value={imgUrl} onChangeText={(text) => setImgUrl(text)} onSubmitEditing={register}/>
                </View> 

                <Button raised title="Register" onPress={register} containerStyle={styles.button}/>
        </KeyboardAvoidingView>
    )
}

export default registerScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        padding : 10,
        backgroundColor : "white",
    },
    text : {
        marginBottom : 50,
    },
    button : {
        width : 200,
        marginTop : 10,
    },
    inputContainer : {
        width : 300,
    }
})