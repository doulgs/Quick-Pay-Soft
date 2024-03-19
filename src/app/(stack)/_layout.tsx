import { Stack } from "expo-router/stack";

import { createBox } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";
import { Pressable } from "react-native";
import { IconSync } from "@/assets/icons/IconSync";
import { IconSignOut } from "@/assets/icons/IconSignOut";
import { useAuth } from "@/contexts/authContext";

const Box = createBox<ThemeProps>();

export default function AppLayout() {
  const { signOut } = useAuth();
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#0A3750" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "QuickPaySoft",
          headerRight: () => {
            return (
              <Box flexDirection="row" gap="lg">
                <Pressable>
                  <IconSync color={THEME.colors.white} />
                </Pressable>
                <Pressable onPress={signOut}>
                  <IconSignOut color={THEME.colors.Error} />
                </Pressable>
              </Box>
            );
          },
        }}
      />
      <Stack.Screen name="CAIXA/index" options={{ headerTitle: "CAIXA" }} />
      <Stack.Screen
        name="VENDAS/index"
        options={{ headerTitle: "Escolha um grupo" }}
      />
      <Stack.Screen name="CARTOES/index" options={{ headerTitle: "CARTOES" }} />
      <Stack.Screen name="MESAS/index" options={{ headerTitle: "MESAS" }} />
      <Stack.Screen
        name="PRODUTOS/index"
        options={{ headerTitle: "PRODUTOS" }}
      />
      <Stack.Screen name="RESUMO/index" options={{ headerTitle: "RESUMO" }} />
      <Stack.Screen name="PEDIDOS/index" options={{ headerTitle: "PEDIDOS" }} />
      <Stack.Screen
        name="[handleGrupo2]"
        options={{ headerTitle: "Escolha seus itens" }}
      />
    </Stack>
  );
}
