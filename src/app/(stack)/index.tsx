import React from "react";
import { FlatList } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

import { MODULOS } from "@/constants/modulos";
import { Modulos } from "@/components/Modulos";
import { BannerFilial } from "@/components/BannerFilial";
import { Empty } from "@/assets/icons/Empty";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Home() {
  const modulosAtivos = MODULOS.filter((modulo) => modulo.ativo);
  return (
    <FlatList
      data={modulosAtivos}
      keyExtractor={(item, index) => String(item.id)}
      renderItem={({ item }) => (
        <Box flex={1}>
          <Modulos data={item} />
        </Box>
      )}
      ListHeaderComponent={() => (
        <Box flex={1} m={"md"} gap="md">
          <BannerFilial />
          <Text fontSize={24} fontStyle="italic" fontWeight="bold">
            Modulos do Sistema
          </Text>
        </Box>
      )}
      ListFooterComponent={() => {
        return (
          <Box flex={1} alignItems="center" marginTop="4xl">
            <Empty />
          </Box>
        );
      }}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
}
