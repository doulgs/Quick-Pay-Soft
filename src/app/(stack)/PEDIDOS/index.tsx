import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Pedidos() {
  return (
    <Box>
      <Text>Pedidos</Text>
    </Box>
  );
}
