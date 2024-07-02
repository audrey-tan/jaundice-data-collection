import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      // padding: 36,
      // paddingVertical: 42,
      // justifyContent: "space-between",
      backgroundColor: "#F6F6F6"
    },
    innerContainer: {
      width: "100%",
      height: "100%",
      paddingHorizontal: 36,
      paddingBottom: 36,
      justifyContent: "space-between",
      backgroundColor: "#F6F6F6"
    },
    linearProgressContainer: {
      paddingTop: 42,
      paddingHorizontal: 34,
    },
    buttonContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: 'center',
      paddingBottom: 8,
      paddingRight: 5
      // backgroundColor: "rgba(255,0,0,1)"
    },
    innerContainer2: {
      width: "104%",
      paddingVertical: 24,
      alignSelf: "center",
      // backgroundColor: "rgba(255,0,0,1)"
    },
    row: {
      paddingVertical: 1,
    },
    headingText: {
      fontFamily: "Roboto-Black",
      fontSize: 28,
    },
    subheadingText: {
      fontFamily: "Roboto-Bold",
      fontSize: 18,
      lineHeight: 28,
      color: "#B7B7B7"
    },
    label: {
      fontFamily: "Roboto-Medium",
      fontWeight: "normal",
      color: "#9B9B9B",
      fontSize: 16,
      paddingVertical: 10,
    },
    subLabel: {
      fontFamily: "Roboto-Medium",
      fontWeight: "normal",
      color: "#B7B7B7",
      fontSize: 14,
    },
    input: {
      fontFamily: "Roboto-Regular",
      paddingHorizontal: 7
    },
    inputContainer: {
      borderBottomWidth: 0,
      backgroundColor: "#E8ECEF",
      borderRadius: 4,
    },
    iconContainer: {
      paddingLeft: 12
    },
    skinToneContainer: {
      flexDirection: "row",
      alignSelf: 'flex-start',
      paddingBottom: 8
    },
    skinToneRectangle: {
      width: 65,
      height: 58,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10
    },
    skinToneNumber: {
      fontFamily: "Roboto-Bold",
      fontSize: 26,
      color: "#F6F6F6",
    }
  });


export default styles