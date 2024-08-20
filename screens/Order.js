import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import { IconButton, TabButton, VerticleTextButton } from "../components";
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  selectedTheme,
} from "../constants";

const Order = ({ navigation, route, appTheme }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    let { selectedLocation } = route.params;
    setSelectedLocation(selectedLocation);
  }, []);

  const renderHeaderSection = () => {
    return (
      <SafeAreaView style={styles.headerContainer}>
        {/* Nav Bar */}
        <View style={styles.navContainer}>
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>
              Pick-up Order
            </Text>
          </View>
          <View style={{ width: 25 }} />
        </View>

        {/* Location */}
        <View style={styles.orderBox}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3, fontSize: 20 }}>
            {selectedLocation?.title}
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  const renderTopBarSection = () => {
    return (
      <View style={styles.topBarContainer}>
        {/* top buttons */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TabButton
            containerStyle={{ width: 60 }}
            label={"Menu"}
            selected={selectedTab == 0}
            onPress={() => setSelectedTab(0)}
          />
          {/* Previous */}
          <TabButton
            containerStyle={{ width: 90 }}
            label={"Previous"}
            selected={selectedTab == 1}
            onPress={() => setSelectedTab(1)}
          />
          {/* Favourite */}
          <TabButton
            containerStyle={{ width: 90 }}
            label={"Favourite"}
            selected={selectedTab == 2}
            onPress={() => setSelectedTab(2)}
          />
        </View>

        {/* order no */}
        <View style={styles.orderNoBox}>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>0</Text>
        </View>
      </View>
    );
  };

  const renderSideBar = () => {
    return (
      <View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="60" r="60" fill={COLORS.primary} />
        </Svg>
        <View style={styles.sideBarContainer}>
          <VerticleTextButton
            //   containerStyle={{ width: "20%" }}
            label={"Snack"}
            //   selected={selectedTab == 0}
            //   onPress={() => setSelectedTab(0)}
          />
          <VerticleTextButton
            //   containerStyle={{ width: 50 }}
            containerStyle={{ marginTop: 50 }}
            label={"Coffee"}
            //   selected={selectedTab == 0}
            //   onPress={() => setSelectedTab(0)}
          />
          <VerticleTextButton
            containerStyle={{ width: 100, marginTop: 70 }}
            //   containerStyle={{ marginTop: 70 }}
            label={"Smothie"}
            //   selected={selectedTab == 0}
            //   onPress={() => setSelectedTab(0)}
          />
          <VerticleTextButton
            containerStyle={{ width: 110, marginTop: 90 }}
            //   containerStyle={{ width: 150 }}
            label={"Spacial Tea"}
            //   selected={selectedTab == 0}
            //   onPress={() => setSelectedTab(0)}
          />
          <VerticleTextButton
            containerStyle={{ width: 80, marginTop: 80 }}
            //   containerStyle={{ width: 60 }}
            label={"Milk Tea"}
            //   selected={selectedTab == 0}
            //   onPress={() => setSelectedTab(0)}
          />
        </View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="0" r="60" fill={COLORS.primary} />
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      {renderHeaderSection()}

      {/* details */}

      <View
        style={{
          ...styles.detailContainer,
          backgroundColor: appTheme.backgroundColor,
        }}
      >
        {/* tab bar section */}
        {renderTopBarSection()}

        {/* Side bar & listing */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          {/* side bar */}
          {renderSideBar()}
          {/* Listing */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 200,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  navContainer: {
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    alignItems: "center",
  },
  orderBox: {
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
    borderRadius: SIZES.padding,
    marginTop: SIZES.radius,
    backgroundColor: COLORS.white1,
  },

  detailContainer: {
    flex: 1,
    marginTop: -45,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  topBarContainer: {
    flexDirection: "row",
    height: 50,
    marginTop: SIZES.radius,
    justifyContent: "center",
    paddingLeft: SIZES.padding * 2,
    paddingRight: SIZES.padding,
  },
  orderNoBox: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  sideBarContainer: {
    marginTop: -10,
    width: 65,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
