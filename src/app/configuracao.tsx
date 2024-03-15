import { ScrollView } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Link } from "expo-router";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Configuracao() {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="almostWhite"
    >
      <Link href={"/(stack)"}>
        <Text>Login</Text>
      </Link>
    </Box>
  );
}
