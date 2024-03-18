import { createBox } from "@shopify/restyle";
import { ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();

function Banner() {
  return (
    <Box
      backgroundColor="white"
      width={"auto"}
      height={150}
      borderRadius={16}
      elevation={2}
    ></Box>
  );
}
export { Banner };
