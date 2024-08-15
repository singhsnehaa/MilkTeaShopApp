import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { HeaderBar } from "../components";
import { COLORS, SIZES } from "../constants";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <ScrollView style={styles.ScrollBarArea}></ScrollView>
    </View>
  );
};

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

export default Home;
