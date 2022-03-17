/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect,useState } from 'react';
import WifiManager, { connectionStatus } from "react-native-wifi-reborn";
import { useNavigation } from '@react-navigation/native';
import {
    Text,PermissionsAndroid,View,StyleSheet,TouchableOpacity,Modal,Dimensions,TextInput,Button,ActivityIndicator
} from 'react-native';
const { width } = Dimensions.get("window");

const App = () => {
    const [list, setList] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [animating, setAnimating] = useState(false);
    const navigation = useNavigation();
 const   permission=async()=>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location permission is required for WiFi connections',
              message:
                'This app needs location permission as this is required  ' +
                'to scan for wifi networks.',
              buttonNegative: 'DENY',
              buttonPositive: 'ALLOW',
            },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const data=await WifiManager.loadWifiList()
        
        setList(data)
        // console.log('list',list)
      } else {
          // Permission denied
      }
    }
useEffect(()=>{
    permission();
})
const connected=async ()=>{
    if(password==''){
        return alert('Enter Your Password!')
    }
    await WifiManager.connectToProtectedSSID(ssid, password, true).then(
        () => {
            setModalVisible(!isModalVisible)
            setAnimating(!animating)
            setTimeout(() => {navigation.replace('Home')}, 5000)
          console.log("Connected successfully!");
        },
        () => {
          alert("Connection failed!");
        }
      );
      
}
    return ( 
        !animating?<View>
            <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={()=>setModalVisible(!isModalVisible)}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                    <TouchableOpacity style={{left:'40%',width:30,height:30,alignItems:'center',justifyContent:'center',backgroundColor:'red',borderRadius:1000}} onPress={()=>{setModalVisible(!isModalVisible);setPassword('')}}>
                        <Text style={{color:'white'}}>X</Text>
                    </TouchableOpacity>
                        <Text style={{width: "80%",paddingVertical: 8,color:'black'}}>Enter Password</Text>
                        <TextInput placeholder="Enter something..." 
                                   value={ssid} style={styles.textInput} 
                                   editable={false} selectTextOnFocus={false}
                                   placeholderTextColor="#a1a1a1" 
                        />
                        <TextInput placeholder="Enter something..." 
                                   value={password} style={styles.textInput} 
                                   onChangeText={(value) => setPassword(value)}
                                   placeholderTextColor="#a1a1a1" 
                        />
  
                        {/** This button is responsible to close the modal */}
                        <Button title="Connect" onPress={()=>connected()} />
                    </View>
                </View>
            </Modal>
            <View style={{alignItems:'center',justifyContent:'center',height:60,backgroundColor:'white',marginBottom:40,width:'100%'}}>
                <Text style = {{fontSize:20,color:'black'}}>Wifi List</Text>
            </View>
            
            {
               !animating?list.map((item, index) => (
                    <TouchableOpacity
                        key = {index}
                        style = {styles.container}
                        onPress = {() => {setModalVisible(!isModalVisible);setSsid(item.SSID)}}
                    >
                        <Text style = {styles.text}>
                            {item.SSID} 
                        </Text>
                  </TouchableOpacity>
               ))
               :<></>
            }
        </View>:
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator animating = {animating} size="large" color="black" />
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
      marginTop: 30,
    },
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: 'white',
        alignItems: 'center',
     },
     text: {
        color: '#4f603c'
     },
     screens: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        // height: 280,
        paddingVertical:10,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        color:'black'
    },
  });
export default App;