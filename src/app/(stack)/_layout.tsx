import { Stack } from "expo-router/stack";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#0A3750" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Quick Pay Soft" }} />
      <Stack.Screen name="CAIXA/index" options={{ headerTitle: "CAIXA" }} />
      <Stack.Screen
        name="BALCAO/index"
        options={{ headerTitle: "Escolha um grupo" }}
      />
      <Stack.Screen name="CARTOES/index" options={{ headerTitle: "CARTOES" }} />
      <Stack.Screen name="MESAS/index" options={{ headerTitle: "MESAS" }} />
      <Stack.Screen
        name="PRODUTOS/index"
        options={{ headerTitle: "PRODUTOS" }}
      />
      <Stack.Screen
        name="RELATORIOS/index"
        options={{ headerTitle: "RELATORIOS" }}
      />
      <Stack.Screen name="PEDIDOS/index" options={{ headerTitle: "PEDIDOS" }} />
      <Stack.Screen
        name="[handleGrupo2]"
        options={{ headerTitle: "Escolha seus itens" }}
      />
    </Stack>
  );
}
