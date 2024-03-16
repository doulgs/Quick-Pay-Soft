import { Image, KeyboardAvoidingView, Pressable } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";
import { Link, router } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { IconSettings } from "@/assets/icons/IconSettings";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Inicio() {
  function handleAcessar() {
    router.replace("/(stack)");
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: THEME.colors.almostWhite,
        padding: 16,
      }}
    >
      <Box flex={1} justifyContent="flex-end">
        <Image
          source={require("../assets/image/Logo.png")}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
          }}
        />
      </Box>

      <Box flex={1} gap="md">
        <Input placeholder="Usuario" />
        <Input placeholder="Senha" />
        <Button title="Acessar" onPress={handleAcessar} />
      </Box>

      <Box position="absolute" top={"7%"} right={"7%"}>
        <Pressable>
          <Link href={"/configuracao"}>
            <IconSettings />
          </Link>
        </Pressable>
      </Box>
    </KeyboardAvoidingView>
  );
}
