import { FlatList, ScrollView } from "react-native";
import { Banner } from "@/components/banner";
import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { MODULOS } from "@/constants/modulos";
import { Card_Modulos } from "@/components/card_modulos";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function App() {
  return (
    <FlatList
      data={MODULOS}
      keyExtractor={(item, index) => String(item.id)}
      renderItem={({ item }) => (
        <Box flex={1} width="50%" marginVertical={"sm"}>
          <Card_Modulos data={item} />
        </Box>
      )}
      ListHeaderComponent={() => (
        <Box flex={1} marginVertical={"md"}>
          <Banner />
          <Banner />
        </Box>
      )}
      numColumns={2}
      contentContainerStyle={{ padding: 24 }}
    />
  );
}
