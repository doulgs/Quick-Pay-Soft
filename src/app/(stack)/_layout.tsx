import { Stack } from "expo-router/stack";
import { Pressable } from "react-native";
import { IconSettings } from "@/assets/icons/IconSettings";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#0A3750" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 28 },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Smart P.O.S",
          headerRight: () => (
            <Pressable>
              <IconSettings color="#FFF" type="preenchido" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="CAIXA/index"
        options={{ headerShown: true, headerTitle: "CAIXA" }}
      />
      <Stack.Screen
        name="BALCAO/index"
        options={{ headerShown: true, headerTitle: "BALCAO" }}
      />
      <Stack.Screen
        name="CARTOES/index"
        options={{ headerShown: true, headerTitle: "CARTOES" }}
      />
      <Stack.Screen
        name="MESAS/index"
        options={{ headerShown: true, headerTitle: "MESAS" }}
      />
      <Stack.Screen
        name="PRODUTOS/index"
        options={{ headerShown: true, headerTitle: "PRODUTOS" }}
      />
      <Stack.Screen
        name="RELATORIOS/index"
        options={{ headerShown: true, headerTitle: "RELATORIOS" }}
      />
      <Stack.Screen
        name="[handleGrupo2]"
        options={{ headerShown: true, headerTitle: "ITENS" }}
      />
    </Stack>
  );
}
