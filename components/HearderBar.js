import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const HeaderBar = () => {
  return (
    <SafeAreaView style={styles.headerBox}>
      {/* greetings */}
      <View style={styles.leftArea}>
        <Text style={styles.nameArea}>Sneha,</Text>
        <Text style={styles.nameArea}>Welcome Back!</Text>
      </View>

      {/* toggle button */}
      <TouchableOpacity style={styles.rightArea}>
        {/* Sun Component */}
        <View style={styles.imageArea}>
          <Image source={icons.sunny} style={styles.sunImage} />
        </View>

        {/* Moon Component */}
        <View style={{ ...styles.imageArea, ...styles.selectedNightModeStyle }}>
          <Image source={icons.night} style={styles.sunImage} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
  headerBox: {
    height: 150,
    width: "100%",
    backgroundColor: COLORS.purple,
    flexDirection: "row",
  },
  leftArea: {
    flex: 1,
    paddingLeft: SIZES.padding,
    marginTop: 10,
  },
  nameArea: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  rightArea: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPurple,
    marginTop: 10,
  },
  imageArea: {
    width: 40,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  sunImage: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
});

export default HeaderBar;
