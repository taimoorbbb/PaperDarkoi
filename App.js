/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
const App = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(connectionInfo => {
            console.log(
               'Connection type: ' + 
               connectionInfo.type + 
               ', Is connected?: ' + 
               connectionInfo.isConnected);
                if (!connectionInfo.isConnected) {
                navigation.replace('WifiChecker')
                }
          });
        //   NetInfo.fetch().then((state) => {
        //     console.log(
        //       `Connection type: ${state.type}
        //       Is connected?: ${state.isConnected}
        //       IP Address: ${state.details.ipAddress}`,
        //     );
        //     if (!state.isConnected) {
        //         navigation.replace('WifiChecker')
        //     }
        //   });
        });
    
    return ( <
        WebView startInLoadingState = { true }
        mediaPlaybackRequiresUserAction = { false }
        javaScriptEnabled = { true }
        source = {
            { uri: 'https://darkoi.labd.tech/darkoi/student/login' }
        }
        />
    );
};

export default App;