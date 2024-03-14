import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Settings() {
  return (
    <Box flex={1}>
      <Text>COMPONENTE DE Settings</Text>
    </Box>
  );
}
