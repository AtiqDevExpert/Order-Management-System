import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import { isLoggedIn } from '../services/userservice';
import PrintScreen from '../screens/PrintScreen';
import PrintScreenBle from '../screens/PrintScreenBle';
import PrintScreenNet from '../screens/PrintScreenNet';


const Stack = createNativeStackNavigator();


class StackNavigation extends Component  {
    render() {
        return (
            
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,gestureEnabled:false
                }}
                initialRouteName={"HomeScreen"}
            >
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="MenuScreen" component={MenuScreen} />
                <Stack.Screen name="PrintScreen" component={PrintScreen} />
                <Stack.Screen name="PrintScreenNet" component={PrintScreenNet} />
                <Stack.Screen name="PrintScreenBle" component={PrintScreenBle} />
                
            </Stack.Navigator>
               
            
            
        );
    }
}

export default StackNavigation;