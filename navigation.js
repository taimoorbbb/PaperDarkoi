import * as React from 'react';
import { View, Text } from 'react-native';
import App from './App';
import Home from './Home';
import Wifi from './wifi';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function Apps() {
    return (
    <NavigationContainer > 
        <Stack.Navigator
            initialRouteName='App'
            screenOptions={{
                headerShown: false,
              }}
        > 
            < Stack.Screen name = "App" component = { App } /> 
            < Stack.Screen name = "Home" component = { Home } /> 
            <Stack.Screen name = "WifiChecker" component = { Wifi } /> 
        </Stack.Navigator> 
    </NavigationContainer>
    );
}

export default Apps;