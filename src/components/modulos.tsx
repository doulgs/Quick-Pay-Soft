import React, { useState } from "react";
import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";
import { Alert, Pressable } from "react-native";
import { router } from "expo-router";
import { MODULOS_PROPS } from "@/constants/modulos";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

interface CardModulosProps {
  data: MODULOS_PROPS;
}

function Modulos({ data }: CardModulosProps) {
  const [isHandlingNavigation, setIsHandlingNavigation] = useState(false);

  async function handleNavigation() {
    if (isHandlingNavigation) return;
    setIsHandlingNavigation(true);

    switch (data.nome_modulo) {
      case "CAIXA":
        router.push("/(stack)/CAIXA");
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
      case "PEDIDOS":
        router.push("/(stack)/PEDIDOS");
        break;
      case "PRODUTOS":
        router.push("/(stack)/PRODUTOS");
        break;
      case "RELATORIOS":
        router.push("/(stack)/RELATORIOS");
        break;
      default:
        // Ação padrão caso nenhum dos casos acima seja correspondido
        // throw new Error(
        //   "Rota não encontrada, Por favor verifique o componente Modulos."
        // );
        Alert.alert(
          "Rota não encontrada",
          "Por Favor entre em contato com o administrador do sistema."
        );
    }

    setIsHandlingNavigation(false);
  }

  function getIconFromModuleName(
    moduleName: string,
    size: number,
    color: string
  ) {
    switch (moduleName) {
      case "CAIXA":
        return (
          <MaterialCommunityIcons name="storefront" size={size} color={color} />
        );
      case "BALCAO":
        return (
          <MaterialIcons name="shopping-basket" size={size} color={color} />
        );
      case "MESAS":
        return <MaterialIcons name="table-bar" size={size} color={color} />;
      case "CARTOES":
        return <Ionicons name="newspaper-sharp" size={size} color={color} />;
      case "PEDIDOS":
        return (
          <MaterialCommunityIcons
            name="clipboard-check"
            size={size}
            color={color}
          />
        );
      case "PRODUTOS":
        return <FontAwesome6 name="boxes-stacked" size={size} color={color} />;
      case "RELATORIOS":
        return <FontAwesome name="pie-chart" size={size} color={color} />;
      default:
        return <MaterialIcons name="error-outline" size={size} color={color} />;
    }
  }

  return (
    <Pressable onPress={handleNavigation}>
      <Box
        m="md"
        height={150}
        elevation={2}
        width="auto"
        borderRadius={16}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        gap="md"
      >
        {getIconFromModuleName(data.nome_modulo, 40, THEME.colors.black)}
        <Text fontSize={24} fontStyle="italic" fontWeight="bold">
          {data.nome_modulo}
        </Text>
      </Box>
    </Pressable>
  );
}

export { Modulos };
