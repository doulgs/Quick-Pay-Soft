import { createTheme } from "@shopify/restyle";

import { colors } from "./colors";
import { spacing } from "./spacing";
import { textVariants } from "./textVariants";

const THEME = createTheme({
  colors,
  spacing,
  textVariants,
});

type ThemeProps = typeof THEME;

export { THEME, ThemeProps };
