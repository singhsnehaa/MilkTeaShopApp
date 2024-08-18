import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { COLORS, FONTS } from "../constants";

const TabButton = ({ containerStyle, selected, label, onPress }) => {
  return (
    <TouchableOpacity
      style={{ alignItems: "center", ...containerStyle }}
      onPress={onPress}
    >
      {/* text */}
      <Text
        style={{
          color: selected ? COLORS.primary : COLORS.gray,
          ...FONTS.body2,
          fontSize: 18,
        }}
      >
        {label}
      </Text>

      {/* line */}
      <View
        style={{
          marginTop: selected ? 3 : 4,
          height: selected ? 4 : 2,
          width: "100%",
          backgroundColor: selected ? COLORS.primary : COLORS.gray,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default TabButton;
