import { Link } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import {AppContext} from '../Context.js';
import React, { useContext } from 'react';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';


const pageNum = 6;


export default function ExpectedScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);

  
  const [errorBilirubin, setErrorBilirubin] = React.useState("");
  const [textBilirubin, onChangeTextBilirubin] = React.useState("");
  const [selectedJaundice, setJaundice] = React.useState(0);


function validateBilirubin(bilirubin : string) {
  if (/^\-?\d+\.?\d*$/.test(bilirubin)) {
    setErrorBilirubin('');
    return true;
  }
  setErrorBilirubin('Bilirubin level must be a number in mg/dL');
  return false;
}

function next() {
   if (validateBilirubin(textBilirubin)) {
    dispatch({type: 'change_page', newValue: pageNum+1})
    dispatch({type: 'change_jaundice', newValue: selectedJaundice})
    dispatch({type: 'change_bilirubin', newValue: parseInt(textBilirubin)})
    
    // @ts-ignore
    navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
    return;
  }

  // @ts-ignore
  navigation.navigate("(screens)" + state.pageRoutes[pageNum]);
  return;
}


return (
    <View style={styles.innerContainer}>
      <View>
        <Text style={[styles.headingText, {paddingTop: 40}]}>Expected results</Text>
        <Text style={[styles.subheadingText, {paddingTop: 20, paddingBottom: 1}]}>Based on known data</Text>
      </View>
      <View style={[styles.innerContainer2, {marginBottom: 128}]}>
        <View style={styles.row}>
          <Text style={[styles.label, {paddingHorizontal: 8}]}>
            Jaundice detected
          </Text>
          <View>
            <CheckBox
              checked={selectedJaundice === 0}
              onPress={() => setJaundice(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="No"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedJaundice === 1}
              onPress={() => setJaundice(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="Yes"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
          </View>
          <View style={[styles.row, {marginTop: 24}]}>
            <Input
                labelStyle={styles.label}
                inputStyle={styles.input}
                placeholderTextColor="#B7B7B7"
                label="Bilirubin level in mg/dL"
                placeholder="eg. 0.3"
                leftIcon={<Icon name="baby-face-outline" size={20} color="#B7B7B7"/>}
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={styles.iconContainer}
                onChangeText={onChangeTextBilirubin}
                errorMessage={errorBilirubin}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Link href={state.pageRoutes[pageNum-1]} asChild> 
          <Button 
            type="outline"
            radius={7}
            titleStyle={{fontFamily: "Roboto-Medium", color: "#6779D1"}}
            buttonStyle={{width: 145, alignSelf: "flex-start", borderWidth: 1.2, borderColor: "#6779D1"}}
            onPress={() => dispatch({type: 'change_page', newValue: pageNum-1})}
          >
            Previous
          </Button>
        </Link>
        <Button 
          ViewComponent={LinearGradient} 
          linearGradientProps={{
            colors: ["#494FA0", "#6779D1"],
            start: { x: 0, y: 0.5},
            end: { x: 0.6, y: 0.5 },
            height: 43
          }}
          radius={7}
          titleStyle={{fontFamily: "Roboto-Medium"}}
          buttonStyle={{width: 145, alignSelf: "flex-end"}}
          raised={true}
          onPress={() => next()}
        >
          Next
        </Button>
        
      </View>
    </View>

  );
}
