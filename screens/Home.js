import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { CustomButton, HeaderBar } from "../components";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
  images,
} from "../constants";

const Home = ({ navigation, appTheme, toggleTheme }) => {
  //
  const scrollX = useRef(new Animated.Value(0)).current;

  const promoTabs = constants.promoTabs.map((promoTab) => ({
    ...promoTab,
    ref: React.createRef(),
  }));

  const promoScrollViewRef = useRef();

  const onPromoTabPress = useCallback((promoTabIndex) => {
    promoScrollViewRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width,
    });
  });

  const renderAvailablesRewards = () => {
    return (
      <TouchableOpacity
        style={styles.rewardBox}
        onPress={() => navigation.navigate("Rewards")}
      >
        {/* Reward cup */}
        <View style={styles.leftRewardBox}>
          <ImageBackground
            source={icons.reward_cup}
            resizeMode="contain"
            style={styles.leftCupImage}
          >
            <View style={styles.LeftTextArea}>
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>24</Text>
            </View>
          </ImageBackground>
        </View>
        {/* Reward details */}

        <View style={styles.rightRewardBox}>
          <Text style={{ color: COLORS.primary, ...FONTS.h2, fontSize: 20 }}>
            Available Rewards
          </Text>

          <View style={styles.rewardPoint}>
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              150 points - $2.50 off
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPromoDeals = () => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Header - tabs */}
        <Tabs
          appTheme={appTheme}
          scrollX={scrollX}
          onPromoTabPress={onPromoTabPress}
        />

        {/* Details */}
        <Animated.FlatList
          ref={promoScrollViewRef}
          data={dummyData.promos}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.renderPromoData}>
                {/* image */}
                <Image
                  source={images.strawberryBackground}
                  resizeMode="contain"
                  style={{ width: "100%" }}
                />
                {/* Name */}
                <Text style={{ color: COLORS.red, ...FONTS.h1, fontSize: 27 }}>
                  {item.name}
                </Text>

                {/* Description */}
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body4,
                    marginTop: 3,
                  }}
                >
                  {item.description}
                </Text>

                {/* Callories */}
                <Text
                  style={{
                    color: appTheme.textColor,
                    ...FONTS.body4,
                    marginTop: 3,
                  }}
                >
                  Callories: {item.calories}
                </Text>

                {/* Button */}
                <CustomButton
                  containerStyle={styles.CustomButtonStyle}
                  labelStyle={{ ...FONTS.h3 }}
                  label={"Order Now"}
                  onPress={() => navigation.navigate("Location")}
                  isPrimaryButton={true}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  const TabIndicator = ({ measureLayout, scrollX }) => {
    const inputRange = promoTabs.map((_, i) => i * SIZES.width);

    const tabIndicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map((measure) => measure.width),
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measureLayout.map((measure) => measure.x),
    });

    return (
      <Animated.View
        style={{
          ...styles.tabIndicatorContainer,
          width: tabIndicatorWidth,
          transform: [{ translateX }],
        }}
      />
    );
  };

  const Tabs = ({ appTheme, scrollX, onPromoTabPress }) => {
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = React.useRef();
    const tabPosition = Animated.divide(scrollX, SIZES.width);

    useEffect(() => {
      let ml = [];

      promoTabs.forEach((promo) => {
        promo.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            ml.push({ x, y, width, height });

            if (ml.length === promoTabs.length) {
              setMeasureLayout(ml);
            }
          }
        );
      });
    }, [containerRef.current]);

    return (
      <View
        ref={containerRef}
        style={{
          ...styles.tabContainer,
          backgroundColor: appTheme.tabBackgroundColor,
        }}
      >
        {/* Tab Indicator */}
        {measureLayout.length > 0 && (
          <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
        )}

        {/* Tabs  */}
        {promoTabs.map((item, index) => {
          const textColor = tabPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray2, COLORS.white, COLORS.lightGray2],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity
              key={`PromoTab-${index}`}
              onPress={() => onPromoTabPress(index)}
            >
              <View style={styles.promoTabs} ref={item.ref}>
                <Animated.Text style={{ color: textColor, ...FONTS.h3 }}>
                  {item.title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView
        style={{
          ...styles.ScrollBarArea,
          backgroundColor: appTheme.backgroundColor,
        }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Rewards Section */}
        {renderAvailablesRewards()}

        {/* Promo Section */}
        {renderPromoDeals()}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollBarArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginTop: -30,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },

  //   rewards styles
  rewardBox: {
    flexDirection: "row",
    height: 100,
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
  },
  leftRewardBox: {
    backgroundColor: COLORS.pink,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  leftCupImage: {
    height: 85,
    width: 85,
    marginLeft: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  LeftTextArea: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.transparentBlack,
  },
  rightRewardBox: {
    flex: 1,
    backgroundColor: COLORS.lightPink,
    marginLeft: -10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardPoint: {
    backgroundColor: COLORS.primary,
    marginTop: 5,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.base,
  },

  //   Promo styles
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
  },
  promoTabs: {
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  tabIndicatorContainer: {
    position: "absolute",
    height: "100%",
    // width: 126,
    left: 0,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  renderPromoData: {
    flex: 1,
    alignItems: "center",
    width: SIZES.width,
    paddingTop: SIZES.padding,
  },
  CustomButtonStyle: {
    marginTop: 10,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.radius * 2,
  },
});
