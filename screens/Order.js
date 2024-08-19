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
import { IconButton, TabButton } from "../components";
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
  return <View style={styles.container}>{renderHeaderSection()}</View>;
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
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
