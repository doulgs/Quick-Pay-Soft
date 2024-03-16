import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { router } from "expo-router";
import { Pressable } from "react-native";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Balcao() {
  function handleGrupo2Selected() {
    router.push("/(stack)/321");
  }

  return (
    <Box>
      <Pressable onPress={handleGrupo2Selected}>
        <Text>Balcao</Text>
      </Pressable>
    </Box>
  );
}
