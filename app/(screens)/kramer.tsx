import { Link, useNavigation } from 'expo-router';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, LinearProgress, Image } from '@rneui/themed';
import { CheckBox, Input } from '@rneui/base';
import { useFonts } from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles.js';
import Layout from './Layout.js';
import {AppContext} from '../Context.js';
import React, { useContext } from 'react';
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';


const pageNum = 4;


export default function KramerScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);

  const [selectedIndex, setIndex] = React.useState(state.kramer); 

  function next() {
    dispatch({type: 'change_page', newValue: pageNum+1})
    dispatch({type: 'change_kramer', newValue: selectedIndex})
    
    // @ts-ignore
    navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
    return;
  } 

  return (
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View>
          <Text style={[styles.headingText, {paddingTop: 40}]}>Kramer's scale</Text>
          <Text style={[styles.subheadingText, {paddingTop: 20, paddingBottom: 0}]}>Select the scale value based on{'\n'}visual assessment</Text>
        </View>
        <View style={[styles.innerContainer2, {flexDirection: "row", paddingTop: 12}]}>
          <Image
            source={require('../../assets/images/kramer.png')}
            style={{width: 160, height: 280, marginTop: 24}}
          />
          <View>
            <CheckBox
              checked={selectedIndex === 0}
              onPress={() => setIndex(0)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="0: None"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"1: Face / \n    neck"}
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedIndex === 2}
              onPress={() => setIndex(2)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"2: Chest / \n    upper \n    abdomen"}
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedIndex === 3}
              onPress={() => setIndex(3)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"3: Lower \n    abdomen / \n    thighs"}
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedIndex === 4}
              onPress={() => setIndex(4)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"4: Arms / \n    lower legs"}
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            <CheckBox
              checked={selectedIndex === 5}
              onPress={() => setIndex(5)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title={"5: Palms / \n    soles"}
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)", paddingTop: 2}}
              checkedColor="#6779D1"
            />
            
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
      </ScrollView>
  );
}