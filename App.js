/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar hidden />
    <WebView startInLoadingState={true} 
    mediaPlaybackRequiresUserAction={false}    
    javaScriptEnabled={ true }
    source={{ uri: 'https://darkoi.labd.tech/darkoi/student/login' }} />
    </SafeAreaView>
  );
};

export default App;
