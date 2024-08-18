import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { IconButton } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const Location = ({ navigation, appTheme }) => {
  //

  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.HeaderContainer}>
        <View style={styles.headerTextArea}>
          {/* Back Button */}

          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />

          {/* title */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Locations</Text>
          </View>

          {/* empty */}
          <View style={{ width: 25 }}></View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Details */}
      <View
        style={{
          ...styles.detailsContainer,
          backgroundColor: appTheme.backgroundColor,
        }}
      >
        {/* {renderTopBarSection()} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderContainer: {
    height: 120,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  headerTextArea: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: SIZES.padding,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
