import { Pressable, PressableProps, StatusBar } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();
const STATUS_BAR_HEIGHT = StatusBar.currentHeight
  ? StatusBar.currentHeight
  : 40;

interface Props extends PressableProps {
  title: string;
}

const Header: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <Box
      width={"auto"}
      height={STATUS_BAR_HEIGHT + 60}
      backgroundColor="primary_900"
      flexDirection="row"
      alignItems="flex-end"
      paddingVertical="md"
      paddingHorizontal="md"
      gap="md"
    >
      <Pressable onPress={() => router.back()} {...rest}>
        <Feather name="arrow-left" size={32} color={THEME.colors.almostWhite} />
      </Pressable>
      <Text color="white" fontSize={20}>
        {title}
      </Text>
    </Box>
  );
};

export { Header };
