import React from "react";
import { THEME, ThemeProps } from "@/theme";
import { createBox, createText } from "@shopify/restyle";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
}

const Button: React.FC<Props> = ({ title, color, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} {...rest}>
      <Box
        borderRadius={8}
        alignItems="center"
        paddingVertical="sm"
        justifyContent="center"
        style={{ backgroundColor: color ? color : THEME.colors.primary_900 }}
      >
        <Text color="white" fontSize={18}>
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { Button };
