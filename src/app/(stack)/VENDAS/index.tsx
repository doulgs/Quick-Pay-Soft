import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { grupos2 } from "@/fake";
import { interface_grupos2 } from "@/types";
import { Dimensions, Pressable } from "react-native";
import { Base64Image } from "@/components/Base64Image";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

const NUMERO_DE_COLUNAS = 3;
const LARGURA_DA_TELA = Dimensions.get("window").width;
const LARGURA_DA_COLUNA = LARGURA_DA_TELA / NUMERO_DE_COLUNAS;

export default function Vendas() {
  function handleGrupo2Selected(handleGrupo2: string) {
    router.push(`/(stack)/${handleGrupo2}`);
  }

  const renderizar = ({ item }: { item: interface_grupos2 }) => (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => handleGrupo2Selected(item.Handle.toString())}
    >
      <Box
        m={"s"}
        flex={1}
        bg="white"
        borderRadius={8}
        height={LARGURA_DA_COLUNA}
        elevation={2}
        overflow="hidden"
      >
        <Base64Image base64Image={item.FotoBase64} />
        <Box flex={1} maxHeight={40} justifyContent="center" bg="Alert">
          <Text
            fontSize={14}
            fontWeight="bold"
            textAlign="center"
            numberOfLines={2}
          >
            {item.Nome}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} p={"sm"}>
      <FlashList
        data={grupos2}
        renderItem={renderizar}
        numColumns={3}
        estimatedItemSize={200}
      />
    </Box>
  );
}
