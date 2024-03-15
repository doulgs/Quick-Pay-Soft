import { ScrollView } from "react-native";
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Link } from "expo-router";
import { Input } from "@/components/input";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Configuracao() {
  let infoDevice = "teste";
  function handleCadastrarDispositivo() {}
  function handleLimparDados() {}

  return (
    <Box flex={1} backgroundColor="almostWhite">
      <Box flex={1} mt={"2xl"} p={"sm"} gap="md">
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
      </Box>
    </Box>
  );
}
