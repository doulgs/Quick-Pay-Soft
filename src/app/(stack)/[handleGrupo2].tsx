import { useLocalSearchParams } from "expo-router";

import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Itens() {
  const { handleGrupo2 } = useLocalSearchParams();
  return (
    <Box>
      <Text>Itens do grupo {handleGrupo2}</Text>
    </Box>
  );
}
