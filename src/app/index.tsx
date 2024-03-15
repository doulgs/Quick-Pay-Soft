import { ScrollView } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Link } from "expo-router";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Inicio() {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="almostWhite"
    >
      <Link href={"/configuracao"} asChild>
        <Text>config</Text>
      </Link>

      <Link href={"/(stack)"} asChild>
        <Text>Login</Text>
      </Link>
      <Link href={"/(stack)/CAIXA"} asChild>
        <Text>Caixa</Text>
      </Link>
    </Box>
  );
}
