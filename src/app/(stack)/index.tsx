import React from "react";
import { FlatList } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

import { MODULOS } from "@/constants/modulos";
import { Modulos } from "@/components/modulos";
import { Banner } from "@/components/banner";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Home() {
  return (
    <FlatList
      data={MODULOS}
      keyExtractor={(item, index) => String(item.id)}
      renderItem={({ item }) => (
        <Box flex={1}>
          <Modulos data={item} />
        </Box>
      )}
      // ListHeaderComponent={() => (
      //   <Box flex={1}>
      //     <Banner />
      //     <Banner />
      //   </Box>
      // )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
}
