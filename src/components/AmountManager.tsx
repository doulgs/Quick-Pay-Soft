import { Pressable, PressableProps } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

interface Props {
  amount?: number;
  increase?: () => void;
  decrease?: () => void;
}

const AmountManager: React.FC<Props> = ({
  amount = 0,
  increase,
  decrease,
  ...rest
}) => {
  return (
    <Box
      height={35}
      width={100}
      flexDirection="row"
      overflow="hidden"
      borderRadius={8}
      borderWidth={0.5}
      {...rest}
    >
      <Box width={30} bg="primary_800">
        <Pressable
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={decrease}
        >
          <Text>-</Text>
        </Pressable>
      </Box>
      <Box
        flex={1}
        bg="almostWhite"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{amount}</Text>
      </Box>
      <Box width={30} bg="primary_800">
        <Pressable
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={increase}
        >
          <Text fontSize={22}>+</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export { AmountManager };
