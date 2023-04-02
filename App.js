import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import loginScreen from "./screens/loginScreen";
import registerScreen from "./screens/registerScreen";
import homeScreen from "./screens/homeScreen";
import addChat from "./screens/addChat";
import chatScreen from "./screens/chatScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle : {backgroundColor : "#2CE6BE"},
  headerTitleStyle : {color : "white"},
  headerTintColor : "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={loginScreen}/>
          <Stack.Screen name="Register" component={registerScreen}/>
          <Stack.Screen name="Home" component={homeScreen}/>
          <Stack.Screen name="AddChat" component={addChat}/>
          <Stack.Screen name="ChatScreen" component={chatScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
