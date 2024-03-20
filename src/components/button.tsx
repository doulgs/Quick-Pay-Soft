import React from "react";
import { THEME, ThemeProps } from "@/theme";
import { createBox, createText } from "@shopify/restyle";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  color,
  isLoading,
  disabled,
  ...rest
}) => {
  const backcolor = disabled ? THEME.colors.gray : THEME.colors.primary_900;
  return (
    <TouchableOpacity activeOpacity={0.7} disabled={isLoading} {...rest}>
      <Box
        borderRadius={8}
        alignItems="center"
        paddingVertical="sm"
        justifyContent="center"
        style={{ backgroundColor: backcolor }}
      >
        {isLoading ? (
          <ActivityIndicator color={"#FFF"} size={22} />
        ) : (
          <Text color="white" fontSize={18}>
            {title}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export { Button };
