import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

function Banner() {
  return (
    <Box
      backgroundColor="white"
      width={"100%"}
      height={150}
      borderRadius={16}
      elevation={3}
    ></Box>
  );
}
export { Banner };
