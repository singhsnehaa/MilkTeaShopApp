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
import { IconButton, TabButton } from "../components";
import {
  COLORS,
  FONTS,
  SIZES,
  dummyData,
  icons,
  selectedTheme,
} from "../constants";

const Location = ({ navigation, appTheme }) => {
  const [selectedTab, setSelectedTab] = useState(0);
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

  const renderTopBarSection = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {/* NearBy */}
        <TabButton
          containerStyle={{ width: 80 }}
          label={"Nearby"}
          selected={selectedTab == 0}
          onPress={() => setSelectedTab(0)}
        />
        {/* Previous */}
        <TabButton
          containerStyle={{ width: 100 }}
          label={"Previous"}
          selected={selectedTab == 1}
          onPress={() => setSelectedTab(1)}
        />
        {/* Favourite */}
        <TabButton
          containerStyle={{ width: 100 }}
          label={"Favourite"}
          selected={selectedTab == 2}
          onPress={() => setSelectedTab(2)}
        />
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={"enter your city, state or zip code"}
          placeholderTextColor={COLORS.lightGray2}
        />
        <Image source={icons.search} style={styles.searchStyle} />
      </View>
    );
  };

  const renderLocationList = () => {
    return (
      <FlatList
        style={styles.locationListStyle}
        data={dummyData.locations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                ...styles.renderContainer,
                backgroundColor: appTheme.cardBackgroundColor,
              }}
              onPress={() =>
                navigation.navigate("Order", {
                  selectedLocation: item,
                })
              }
            >
              {/* Name & Bookmark */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ flex: 1, color: appTheme.textColor, ...FONTS.h2 }}
                >
                  {item.title}
                </Text>
                <Image
                  source={
                    item.bookmarked ? icons.bookmarkFilled : icons.bookmark
                  }
                  style={{
                    ...styles.bookmarkStyle,
                    tintColor: item.bookmarked ? COLORS.red2 : COLORS.white,
                  }}
                />
              </View>
              {/* Address */}

              <View style={{ width: "80%", marginTop: SIZES.base }}>
                <Text
                  style={{
                    flex: 1,
                    color: appTheme.textColor,
                    ...FONTS.body3,
                    lineHeight: 21,
                  }}
                >
                  {item.address}
                </Text>
              </View>
              {/* Operation Hours */}

              <View style={{ marginTop: SIZES.base }}>
                <Text
                  style={{
                    flex: 1,
                    color: appTheme.textColor,
                    ...FONTS.body5,
                    lineHeight: 16,
                  }}
                >
                  {item.operation_hours}
                </Text>
              </View>

              {/* Services */}

              <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
                {/* pick - up */}
                <View
                  style={{
                    ...styles.pickUpBtn,
                    borderColor: appTheme.textColor,
                  }}
                >
                  <Text
                    style={{
                      color: appTheme.textColor,
                      ...FONTS.body3,
                    }}
                  >
                    Pick-Up
                  </Text>
                </View>

                {/* Delivery */}

                <View
                  style={{
                    ...styles.pickUpBtn,
                    borderColor: appTheme.textColor,
                    marginLeft: 7,
                  }}
                >
                  <Text
                    style={{
                      color: appTheme.textColor,
                      ...FONTS.body3,
                    }}
                  >
                    Dekivery
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
        {renderTopBarSection()}

        {renderSearchBar()}

        {renderLocationList()}
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
  searchBarContainer: {
    flexDirection: "row",
    marginTop: SIZES.radius,
    height: 50,
    paddingHorizontal: SIZES.padding,
    borderRadius: 25,
    backgroundColor: COLORS.lightGreen2,
    alignItems: "center",
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    color: COLORS.black,
    ...FONTS.body3,
  },
  searchStyle: {
    width: 30,
    height: 30,
    tintColor: COLORS.lightGray2,
  },

  locationListStyle: {
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
  },
  renderContainer: {
    marginBottom: SIZES.radius,
    borderRadius: SIZES.radius * 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
  },
  bookmarkStyle: {
    width: 20,
    height: 20,
  },
  pickUpBtn: {
    borderWidth: 1,

    borderRadius: 20,
    paddingHorizontal: SIZES.radius,
    paddingVertical: 5,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
