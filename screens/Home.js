import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { HeaderBar } from "../components";
import { COLORS, SIZES } from "../constants";

const Home = ({ navigation, appTheme, toggleTheme }) => {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView
        style={{
          ...styles.ScrollBarArea,
          backgroundColor: appTheme.backgroundColor,
        }}
      ></ScrollView>
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
});
