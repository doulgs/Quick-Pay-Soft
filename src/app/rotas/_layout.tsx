import { IconApp } from "@/assets/icons/IconApp";
import { Stack } from "expo-router/stack";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerStyle: { backgroundColor: "#0A3750" },
        headerTitleStyle: { fontWeight: "bold", fontSize: 28 },

        headerLeft: () => <IconApp color="#FFF" />,
        // headerRight: () => (
        //   <Link href={"/(stack)/settings"} asChild>
        //     <Pressable>
        //       <IconSettings color="#FFF" type="preenchido" />
        //     </Pressable>
        //   </Link>
        // ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Smart P.O.S" }}
      />
    </Stack>
  );
}
