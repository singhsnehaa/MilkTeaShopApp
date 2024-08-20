import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import Svg, { Circle } from "react-native-svg";
import { IconButton, TabButton, VerticleTextButton } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";

const OrderDetail = ({ navigation, route, appTheme }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let selectedItem = route?.params?.selectedLocation;
    setSelectedItem(selectedItem);
  }, []);

  const renderHeaderSection = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "55%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 40,
            bottom: 0,
            right: 0,
            borderBottomLeftRadius: 100,
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={selectedItem?.thumbnail}
            resizeMode="contain"
            style={{
              marginTop: 60,
              marginLeft: 30,
              width: SIZES.width * 0.7,
              height: SIZES.width * 0.7,
            }}
          />

          {/* Back Button */}
          <IconButton
            containerStyle={{
              position: "absolute",
              top: 45,
              left: 20,
              padding: 10,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.black,
            }}
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  appTheme: state.appTheme,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
