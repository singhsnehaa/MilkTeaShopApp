import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import { IconButton, TabButton, VerticleTextButton } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const OrderDetail = ({ navigation, route, appTheme }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(32);
  const [selectedMilkIndex, setSelectedMilkIndex] = useState(0);
  const [selectedSweetnessLevel, setSelectedSweetnessLevel] = useState(50);
  const [selectedIceLevel, setSelectedIceLevel] = useState(50);

  useEffect(() => {
    let selectedItem = route?.params?.selectedLocation;
    setSelectedItem(selectedItem);
  }, []);

  const milkButtonHandler = (action) => {
    if (action == "next" && selectedMilkIndex < dummyData.milkList.length - 1) {
      setSelectedMilkIndex(selectedMilkIndex + 1);
    } else if (action == "prev" && selectedMilkIndex > 0) {
      setSelectedMilkIndex(selectedMilkIndex - 1);
    }
  };
  const sweetnessLevelButtonHandler = (action) => {
    if (action == "+" && selectedSweetnessLevel < 100) {
      setSelectedSweetnessLevel(selectedSweetnessLevel + 25);
    } else if (action == "-" && selectedSweetnessLevel > 0) {
      setSelectedSweetnessLevel(selectedSweetnessLevel - 25);
    }
  };
  const iceLevelButtonHandler = (action) => {
    if (action == "+" && selectedIceLevel < 100) {
      setSelectedIceLevel(selectedIceLevel + 25);
    } else if (action == "-" && selectedIceLevel > 0) {
      setSelectedIceLevel(selectedIceLevel - 25);
    }
  };

  const renderHeaderSection = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.innerHeaderArea}>
          <Image
            source={selectedItem?.thumbnail}
            resizeMode="contain"
            style={styles.thumbnailImg}
          />

          {/* Back Button */}
          <IconButton
            containerStyle={styles.iconLeftArrow}
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  };

  const renderDetailSection = () => {
    return (
      <View style={styles.detailContainer}>
        {/* Name & desc sect */}
        <View>
          <Text
            style={{ color: appTheme.headerColor, ...FONTS.h1, fontSize: 25 }}
          >
            {selectedItem?.name}
          </Text>
          <Text
            style={{
              color: appTheme.textColor,
              ...FONTS.body3,
              marginTop: SIZES.base,
            }}
          >
            {selectedItem?.description}
          </Text>
        </View>

        {/* Sizes */}
        <View style={styles.sizeContainer}>
          {/* label */}
          <Text
            style={{
              color: appTheme.headerColor,
              ...FONTS.h2,
              fontSize: 20,
            }}
          >
            Pick A Size
          </Text>

          {/* cup */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* 1st cup */}
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "flex-end" }}
              onPress={() => setSelectedSize(20)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={styles.cupStyle}
                imageStyle={{
                  tintColor: selectedSize == 20 ? COLORS.primary : COLORS.gray2,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body3,
                  }}
                >
                  20oz
                </Text>
              </ImageBackground>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  marginTop: 3,
                }}
              >
                $4.50
              </Text>
            </TouchableOpacity>

            {/* 2nd cup */}
            <TouchableOpacity
              style={{ alignItems: "center", justifyContent: "flex-end" }}
              onPress={() => setSelectedSize(32)}
            >
              <ImageBackground
                source={icons.coffee_cup}
                style={styles.cupStyle2}
                imageStyle={{
                  tintColor: selectedSize == 32 ? COLORS.primary : COLORS.gray2,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body3,
                  }}
                >
                  32oz
                </Text>
              </ImageBackground>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body3,
                  marginTop: 3,
                }}
              >
                $5.00
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Milk sweetness and ice */}

        <View style={styles.milkContainer}>
          {/* milk */}

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                color: appTheme.headerColor,
                ...FONTS.h2,
                fontSize: 20,
              }}
            >
              Milk
            </Text>
            <View style={styles.milkBox}>
              <IconButton
                icon={icons.leftArrow}
                containerStyle={styles.milkLeftContainer}
                iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                onPress={() => milkButtonHandler("prev")}
              />

              <Image
                source={dummyData.milkList[selectedMilkIndex].image}
                resizeMode="contain"
                style={styles.milkImg}
              />

              <IconButton
                icon={icons.rightArrow}
                containerStyle={styles.milkLRightContainer}
                iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                onPress={() => milkButtonHandler("next")}
              />
            </View>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
                marginTop: SIZES.base,
              }}
            >
              {dummyData.milkList[selectedMilkIndex].name}
            </Text>
          </View>

          {/*  Sweetness & Iceness */}
          <View style={{ flex: 1 }}>
            {/* Sweetness */}

            <View style={styles.sweetnessContainer}>
              <Text
                style={{
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Sweetness
              </Text>

              <View style={styles.sweetnessBox}>
                {/* left arrow btn */}
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={styles.sweetLeftContainer}
                  iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                  onPress={() => sweetnessLevelButtonHandler("-")}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {selectedSweetnessLevel}%
                  </Text>
                </View>

                {/* right arrow btn */}
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={styles.sweetRightContainer}
                  iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                  onPress={() => sweetnessLevelButtonHandler("+")}
                />
              </View>
            </View>

            {/* Iceness */}

            <View style={styles.sweetnessContainer}>
              <Text
                style={{
                  color: appTheme.headerColor,
                  ...FONTS.h2,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Ice
              </Text>

              <View style={styles.sweetnessBox}>
                {/* left arrow btn */}
                <IconButton
                  icon={icons.leftArrow}
                  containerStyle={styles.sweetLeftContainer}
                  iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                  onPress={() => iceLevelButtonHandler("-")}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {selectedIceLevel}%
                  </Text>
                </View>

                {/* right arrow btn */}
                <IconButton
                  icon={icons.rightArrow}
                  containerStyle={styles.sweetRightContainer}
                  iconStyle={{ tintColor: COLORS.black, width: 15, height: 15 }}
                  onPress={() => iceLevelButtonHandler("+")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: appTheme.backgroundColor }}
    >
      <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 150 }}>
        {/* Header */}
        {renderHeaderSection()}

        {/* Details */}
        {renderDetailSection()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
  },

  innerHeaderArea: {
    position: "absolute",
    top: 0,
    left: 40,
    bottom: 0,
    right: 0,
    borderBottomLeftRadius: 100,
    backgroundColor: COLORS.primary,
  },
  thumbnailImg: {
    marginTop: 60,
    marginLeft: 30,
    width: SIZES.width * 0.7,
    height: SIZES.width * 0.7,
  },
  iconLeftArrow: {
    position: "absolute",
    top: 45,
    left: 20,
    padding: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.black,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: SIZES.padding,
    justifyContent: "space-between",
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.base,
  },
  cupStyle: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  cupStyle2: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  milkContainer: {
    flexDirection: "row",
    marginTop: SIZES.padding,
  },
  milkBox: {
    flexDirection: "row",
    width: 100,
    height: 100,
    marginTop: SIZES.base,
    alignItems: "center",
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  milkLeftContainer: {
    marginLeft: -15,
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  milkImg: {
    width: 70,
    height: 70,
    tintColor: COLORS.white,
    flex: 1,
  },
  milkLRightContainer: {
    marginRight: -15,
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  sweetnessContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding,
  },
  sweetnessBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  sweetLeftContainer: {
    marginLeft: -8,
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  sweetRightContainer: {
    marginRight: -8,
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
