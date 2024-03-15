import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Balcao() {
  return (
    <Box>
      <Text>Balcao</Text>
    </Box>
  );
}
