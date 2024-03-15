import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Pressable } from "react-native";
import { MODULOS_PROPS } from "@/constants/modulos";
import { router } from "expo-router";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

interface CardModulosProps {
  data: MODULOS_PROPS;
}

function Modulos({ data }: CardModulosProps) {
  function handleNavigation() {
    switch (data.nome_modulo) {
      case "CAIXA":
        router.push(`/(stack)/CAIXA`);
        break;
      case "BALCAO":
        router.push("/(stack)/BALCAO");
        break;
      case "MESAS":
        router.push("/(stack)/MESAS");
        break;
      case "CARTOES":
        router.push("/(stack)/CARTOES");
        break;
      case "PRODUTOS":
        router.push("/(stack)/PRODUTOS");
        break;
      case "RELATORIOSs":
        router.push("/(stack)/RELATORIOS");
        break;

      default:
        // Ação padrão caso nenhum dos casos acima seja correspondido
        throw new Error(
          "Rota não encontrada, Por favor verifique o componente Modulos."
        );
        break;
    }
  }

  return (
    <Pressable onPress={() => handleNavigation()}>
      <Box
        m={"md"}
        height={150}
        elevation={2}
        width={"auto"}
        borderRadius={16}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <Text fontSize={24} fontStyle="italic" fontWeight="bold">
          {data.nome_modulo}
        </Text>
      </Box>
    </Pressable>
  );
}
export { Modulos };
