import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { COLORS, FONTS } from "../constants";

const VerticleTextButton = ({ containerStyle, selected, label, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        transform: [{ rotate: "-90deg" }],
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* text */}
      <Text
        style={{
          color: selected ? COLORS.white : COLORS.lightGreen,
          ...FONTS.body2,
          fontSize: 20,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default VerticleTextButton;
