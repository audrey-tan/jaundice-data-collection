import { Link, useNavigation } from 'expo-router';
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
import { RootStackParamList } from '../_layout.js';
import { StackNavigationProp } from '@react-navigation/stack';


const pageNum = 3;


export default function MotherDataScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {state, dispatch} = useContext(AppContext);

  const [selectedIndex, setIndex] = React.useState(state.mSkinTone); 

  function next() {
    dispatch({type: 'change_page', newValue: pageNum+1})
    dispatch({type: 'change_mSkinTone', newValue: selectedIndex})

    // @ts-ignore
    navigation.navigate("(screens)" + state.pageRoutes[pageNum+1]);
    return;
  } 

  return (
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.headingText, {paddingTop: 40}]}>Mother's skin tone</Text>
          <Text style={[styles.subheadingText, {paddingTop: 20, paddingBottom: 1}]}>Based on the Fitzpatrick scale</Text>
        </View>
        <View style={styles.innerContainer2}>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 1}
              onPress={() => setIndex(1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#F0D1B5"}]}>
              <Text style={styles.skinToneNumber}>1</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>Light, pale white</Text>
              <Text style={styles.subLabel}>always burns, never tans</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 2}
              onPress={() => setIndex(2)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#DFB593"}]}>
              <Text style={styles.skinToneNumber}>2</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>White, fair</Text>
              <Text style={styles.subLabel}>usually burns,{'\n'}tans minimally</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 3}
              onPress={() => setIndex(3)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#CA9F81"}]}>
              <Text style={styles.skinToneNumber}>3</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>Medium, white to olive</Text>
              <Text style={styles.subLabel}>sometimes mild burn,{'\n'}tans uniformly</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 4}
              onPress={() => setIndex(4)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#AF7954"}]}>
              <Text style={styles.skinToneNumber}>4</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>Olive, moderate brown</Text>
              <Text style={styles.subLabel}>burns minimally,{'\n'}always tans well</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 5}
              onPress={() => setIndex(5)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#9C6136"}]}>
              <Text style={styles.skinToneNumber}>5</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>Brown, dark brown</Text>
              <Text style={styles.subLabel}>very rarely burns,{'\n'}tans very easily</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === 6}
              onPress={() => setIndex(6)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
              checkedColor="#6779D1"
            />
            <View style={[styles.skinToneRectangle, {backgroundColor: "#3A2320"}]}>
              <Text style={styles.skinToneNumber}>6</Text>
            </View>
            <View style={{justifyContent: "center"}}>
              <Text style={[styles.label, {paddingVertical: 0}]}>Black,{'\n'}very dark brown to black</Text>
              <Text style={styles.subLabel}>never burns</Text>
            </View>
          </View>
          <View style={styles.skinToneContainer}>
            <CheckBox
              checked={selectedIndex === -1}
              onPress={() => setIndex(-1)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              title="   Unknown"
              textStyle={[styles.label, {paddingVertical: 0}]}
              containerStyle={{backgroundColor: "rgba(255,0,0,0)"}}
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
      </View>
  );
}