import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { CustomButton, HeaderBar } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const Rewards = ({ navigation, appTheme }) => {
  //

  const renderRewardPoindSection = () => {
    return (
      <View style={{ alignItems: "center", marginVertical: SIZES.padding }}>
        {/* text */}
        <Text style={{ color: COLORS.primary, ...FONTS.h1, fontSize: 35 }}>
          Rewards
        </Text>
        <Text style={{ ...styles.nextAway, color: appTheme.textColor }}>
          You are 60 points away from your next reward
        </Text>
        {/* images */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode="contain"
          style={styles.rewardCupImage}
        >
          <View style={styles.rewardPointArea}>
            <Text style={{ ...FONTS.h1, marginLeft: 8 }}>280</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.renderButtonsStyle}>
        {/* scan button */}

        <CustomButton
          containerStyle={styles.scanButtonStyle}
          labelStyle={{ ...FONTS.h3 }}
          label={"Scan in Store"}
          onPress={() => navigation.navigate("Location")}
          isPrimaryButton={true}
        />
        {/* redeem button */}
        <CustomButton
          containerStyle={styles.scanButtonStyle}
          labelStyle={{ ...FONTS.h3 }}
          label={"Redeem"}
          onPress={() => navigation.navigate("Location")}
          isSecondaryButton={true}
        />
      </View>
    );
  };

  const renderAvailableRewardHeader = () => {
    return (
      <View style={styles.availableRewad}>
        <Text style={{ color: appTheme.textColor, ...FONTS.h2 }}>
          Available Rewards
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Bbar */}
      <HeaderBar />

      {/* Details */}

      <FlatList
        style={{
          ...styles.ScrollBarArea,
          backgroundColor: appTheme.backgroundColor,
        }}
        data={dummyData.availableRewards}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Reward point */}
            {renderRewardPoindSection()}

            {/* button */}
            {renderButtons()}

            {/* HeaderLabel */}
            {renderAvailableRewardHeader()}
          </View>
        }
        ListFooterComponent={<View style={{ marginBottom: 120 }} />}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                ...styles.renderContainer,
                backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2,
              }}
            >
              <Text
                style={{
                  color: item.eligible ? COLORS.black : COLORS.lightGray2,
                  ...FONTS.body3,
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollBarArea: {
    marginTop: -25,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  renderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.base,
    paddingVertical: SIZES.base,
    borderRadius: 20,
  },
  nextAway: {
    marginTop: 10,
    width: SIZES.width * 0.6,
    textAlign: "center",
    ...FONTS.h3,
    lineHeight: 18,
  },
  rewardCupImage: {
    marginTop: SIZES.padding,
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardPointArea: {
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: COLORS.white,
  },
  renderButtonsStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonStyle: {
    width: 130,
    marginRight: SIZES.radius,
    paddingVertical: 5,
    borderRadius: SIZES.radius * 2,
  },
  availableRewad: {
    marginTop: SIZES.padding,
    marginBottom: SIZES.radius,
    paddingHorizontal: SIZES.padding,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
