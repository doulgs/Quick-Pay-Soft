import { ScrollView, StatusBar } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Configuracao() {
  let infoDevice = "teste";
  function handleCadastrarDispositivo() {}
  function handleLimparDados() {}

  return (
    <>
      <Header title="Configurações" />
      <ScrollView style={{ backgroundColor: THEME.colors.almostWhite }}>
        <Box flex={1} backgroundColor="almostWhite">
          <Box flex={1} p={"md"} gap="md">
            <Text fontSize={16} fontWeight="bold">
              Informações da empresa
            </Text>
            <Input placeholder={`Chave da empresa:`} />
            <Input placeholder={`usuario:`} />
            <Input placeholder={`senha:`} />
            <Text fontSize={16} fontWeight="bold">
              Informações do dispositivo
            </Text>
            <Input placeholder={`UUID: ${infoDevice}`} editable={false} />
            <Input placeholder={`Modelo: ${infoDevice}`} editable={false} />
            <Input placeholder={`Plataforma: ${infoDevice}`} editable={false} />
            <Input placeholder={`Versão: ${infoDevice}`} editable={false} />

            <Box gap="md" mt="lg">
              <Button title="Cadastrar Dispositivo" />
              <Button title="Limpar Banco de Dados" />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
