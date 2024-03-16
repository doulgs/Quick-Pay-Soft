import React from "react";
import { ActivityIndicator } from "react-native";
import { createText, createBox } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

const Text = createText<ThemeProps>();
const Box = createBox<ThemeProps>();

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Aguarde um momento, Os dados estão sendo carregados...",
}) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="almostWhite"
    >
      <Box
        width={300}
        height={180}
        elevation={2}
        borderRadius={30}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <ActivityIndicator size="large" color={THEME.colors.primary_800} />
        {message && (
          <Text
            textAlign="center"
            fontSize={16}
            fontWeight="bold"
            marginTop={"lg"}
          >
            {message}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export { Loading };
