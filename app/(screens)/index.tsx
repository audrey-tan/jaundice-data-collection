import 'react-native-gesture-handler';
import { Link, useNavigation } from 'expo-router';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress, Image } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import LottieView from 'lottie-react-native';
import {AppContext} from '../Context.js';
import React, { useContext, useEffect } from 'react';
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';


const pageNum = 0;


export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const {state, dispatch} = useContext(AppContext);
  const [serverUrl, setServerUrl] = React.useState(state.serverUrl);
  const [errorServerUrl, setErrorServerUrl] = React.useState("");


  function onScreenLoad() {
    dispatch({type: 'change_page', newValue: pageNum})
    dispatch({type: 'change_date', newValue: ""})
    dispatch({type: 'change_time', newValue: ""})
    dispatch({type: 'change_bw', newValue: ""})
    dispatch({type: 'change_gender', newValue: 0})
    dispatch({type: 'change_fSkinTone', newValue: 1})
    dispatch({type: 'change_mSkinTone', newValue: 1})
    dispatch({type: 'change_kramer', newValue: 0})
    dispatch({type: 'clear_foreheads'})
    dispatch({type: 'change_jaundice', newValue: 0})
    dispatch({type: 'change_bilirubin', newValue: 0})
  }

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      onScreenLoad();
    });
    return unsubcribe;
  }, [])
  
  function next(){
    // setErrorServerUrl("");
    console.log("a");
    // console.log(serverUrl);
    // console.log(serverUrl + "/ping/");
    setErrorServerUrl("Loading...");
    axios.get(serverUrl + "/ping/").then(function(response){
      console.log(response.data);
      if(response.data === "Jaundice app OK"){
        dispatch({type: 'change_page', newValue: pageNum+1});
        dispatch({type: 'change_server_url', newValue: serverUrl});
        setErrorServerUrl("");
        // @ts-ignore
        navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
      }else{
        setErrorServerUrl("Invalid service");
      }
    }).catch(function(err){
      console.log(err);
      setErrorServerUrl(err.toString());
    })
    // 
    
    
  }

  return (
        <View style={styles.innerContainer}>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={64} style={{width: "100%"}}>
            <View></View>
            <View style={{alignItems: "center"}}>
              <Image
                source={require('../../assets/images/baby.png')}
                style={{width: 230, height: 204.5, marginBottom: 70, marginTop: 120}}
              />
              <Text style={[styles.headingText, {paddingTop: 0, paddingBottom: 16, textAlign: "center", fontSize: 36}]}>Add new data</Text>
                <Input
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    placeholderTextColor="#B7B7B7"
                    label="Server address"
                    placeholder="http://192.168.0.2:8000"
                    leftIcon={<Icon name="dns" size={20} color="#B7B7B7"/>}
                    inputContainerStyle={styles.inputContainer}
                    leftIconContainerStyle={styles.iconContainer}
                    onChangeText={setServerUrl}
                    errorMessage={errorServerUrl}
                />
            </View>
            <View style={{paddingHorizontal: 6, paddingBottom: 36}}>
              <Button 
                ViewComponent={LinearGradient} 
                linearGradientProps={{
                  colors: ["#494FA0", "#6779D1"],
                  start: { x: 0, y: 0.5},
                  end: { x: 0.6, y: 0.5 },
                }}
                size="lg"
                radius={8}
                titleStyle={{fontFamily: "Roboto-Medium"}}
                raised={true}
                onPress={next}
              >
                Start
              </Button>
              
            </View>
          </KeyboardAvoidingView>
        </View>
  );
}