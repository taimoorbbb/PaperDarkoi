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