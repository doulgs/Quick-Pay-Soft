import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { createText, createBox } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

interface Props extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} {...rest}>
      <Box
        backgroundColor="primary_900"
        borderRadius={8}
        paddingVertical="sm"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize={18}>
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export { Button };
