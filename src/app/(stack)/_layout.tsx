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
          headerTitle: "Publisoft",
          headerRight: () => (
            <Pressable>
              <IconSettings color="#FFF" type="preenchido" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="CAIXA/index" options={{ headerTitle: "CAIXA" }} />
      <Stack.Screen name="BALCAO/index" options={{ headerTitle: "BALCAO" }} />
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
      <Stack.Screen name="[handleGrupo2]" options={{ headerTitle: "ITENS" }} />
    </Stack>
  );
}
