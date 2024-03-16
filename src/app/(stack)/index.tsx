import React from "react";
import { FlatList } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

import { MODULOS } from "@/constants/modulos";
import { Modulos } from "@/components/Modulos";
import { Banner } from "@/components/Banner";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Home() {
  return (
    <FlatList
      data={MODULOS}
      keyExtractor={(item, index) => String(item.id)}
      renderItem={({ item }) => (
        <>
          {item.ativo && (
            <Box flex={1}>
              <Modulos data={item} />
            </Box>
          )}
        </>
      )}
      ListHeaderComponent={() => (
        <Box flex={1} m={"md"} gap="md">
          <Banner />
          <Text fontSize={24} fontStyle="italic" fontWeight="bold">
            Modulos do Sistema
          </Text>
        </Box>
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
}
