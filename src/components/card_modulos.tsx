import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Dimensions, Pressable } from "react-native";
import { MODULOS_PROPS } from "@/constants/modulos";

const WIDTH = Dimensions.get("window").width;

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

interface CardModulosProps {
  data: MODULOS_PROPS;
}

function Card_Modulos({ data }: CardModulosProps) {
  return (
    <Pressable onPress={() => alert(`${data.nome_modulo}`)}>
      <Box
        backgroundColor="white"
        width={"100%"}
        height={150}
        borderRadius={16}
        elevation={3}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={24} fontStyle="italic" fontWeight="bold">
          {data.nome_modulo}
        </Text>
      </Box>
    </Pressable>
  );
}
export { Card_Modulos };
