import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import * as SplashScreen from "expo-splash-screen";

import { THEME } from "@/theme";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { SQLiteProvider } from "expo-sqlite/next";
import { databaseInit } from "@/database/databaseInit";
import { OrderProvider } from "@/contexts/orderContext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return;
  }

  return (
    <ThemeProvider theme={THEME}>
      <StatusBar style="light" />
      <SQLiteProvider databaseName="quickpaysoft.db" onInit={databaseInit}>
        <OrderProvider>
          <Slot />
        </OrderProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
