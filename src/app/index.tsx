import { IconSettings } from "@/assets/icons/IconSettings";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/contexts/authContext";
import { THEME, ThemeProps } from "@/theme";
import { criptografarParaMD5 } from "@/utils/helpers/criptografarParaMD5";
import { createBox, createText } from "@shopify/restyle";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Pressable } from "react-native";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Inicio() {
  const { acessar } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleAcessar() {
    if (usuario !== "" || senha !== "") {
      const senhaMDS = await criptografarParaMD5(senha);
      acessar(usuario, senhaMDS);
    }
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
        <Input
          placeholder="Usuario"
          value={usuario}
          onChangeText={(t) => setUsuario(t)}
        />
        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={(t) => setSenha(t)}
          secureTextEntry
        />
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
