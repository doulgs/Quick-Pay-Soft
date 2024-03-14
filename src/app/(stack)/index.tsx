import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { IconApp } from "@/assets/icons/IconApp";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function App() {
  return (
    <Box flex={1} p="sm">
      <Text>COMPONENTE DE TESTE</Text>
    </Box>
  );
}
