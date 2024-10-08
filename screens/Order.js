import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import { IconButton, TabButton, VerticleTextButton } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const Order = ({ navigation, route, appTheme }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCatogory, setSelectedTCatogory] = useState("Milk Tea");
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    let { selectedLocation } = route.params;
    setSelectedLocation(selectedLocation);
  }, []);

  useEffect(() => {
    let menuList = dummyData.menuList.filter(
      (menuItem) => menuItem.category == selectedCatogory
    );
    setMenu(menuList);
  }, [selectedCatogory]);

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
            label={"Snack"}
            selected={selectedCatogory == "Snack"}
            onPress={() => setSelectedTCatogory("Snack")}
          />
          <VerticleTextButton
            containerStyle={{ marginTop: 50 }}
            label={"Coffee"}
            selected={selectedCatogory == "Coffee"}
            onPress={() => setSelectedTCatogory("Coffee")}
          />
          <VerticleTextButton
            containerStyle={{ width: 100, marginTop: 70 }}
            label={"Smoothie"}
            selected={selectedCatogory == "Smoothie"}
            onPress={() => setSelectedTCatogory("Smoothie")}
          />
          <VerticleTextButton
            containerStyle={{ width: 110, marginTop: 90 }}
            label={"Spacial Tea"}
            selected={selectedCatogory == "Specialtea"}
            onPress={() => setSelectedTCatogory("Specialtea")}
          />
          <VerticleTextButton
            containerStyle={{ width: 80, marginTop: 80 }}
            label={"Milk Tea"}
            selected={selectedCatogory == "Milk Tea"}
            onPress={() => setSelectedTCatogory("Milk Tea")}
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
          <FlatList
            data={menu}
            contentContainerStyle={{ marginTop: 16, paddingBottom: 60 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate("OrderDetail", {
                      selectedLocation: item,
                    })
                  }
                >
                  <View
                    style={{
                      ...styles.renderMenuListContainer,
                      marginTop: index > 0 ? SIZES.padding : 0,
                    }}
                  >
                    {/* Thumbnail */}
                    <View style={styles.menuThumbnailBox}>
                      <Image
                        source={item.thumbnail}
                        resizeMode="contain"
                        style={{ width: 100, height: 100 }}
                      />
                    </View>

                    {/* Details */}
                    <View style={styles.menuDetailBox}>
                      <Text style={styles.detailHeader}>{item.name}</Text>
                      <Text
                        style={{
                          color: COLORS.lightYellow,
                          ...FONTS.h2,
                          fontSize: 18,
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
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
    zIndex: 1,
  },
  renderMenuListContainer: {
    height: 150,
    paddingHorizontal: SIZES.padding,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  menuThumbnailBox: {
    position: "absolute",
    top: 0,
    left: SIZES.padding,
    width: 130,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightYellow,
    zIndex: 1,
  },
  menuDetailBox: {
    width: "70%",
    height: "85%",
    padding: "22%",
    paddingRight: SIZES.base,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius,
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  detailHeader: {
    color: COLORS.white,
    ...FONTS.h2,
    fontSize: 18,
    lineHeight: 25,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
