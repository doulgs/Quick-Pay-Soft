import { AmountManager } from "@/components/AmountManager";
import { Base64Image } from "@/components/Base64Image";
import { Button } from "@/components/Button";
import { useOrder } from "@/contexts/orderContext";
import { itens } from "@/fake";
import { THEME, ThemeProps } from "@/theme";
import { interface_itens } from "@/types";
import { formatarParaMoeda } from "@/utils/helpers/formatarParaMoeda";
import { FlashList } from "@shopify/flash-list";
import { createBox, createText } from "@shopify/restyle";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Itens() {
  const { order } = useOrder();
  const { handleGrupo2 } = useLocalSearchParams();

  // Estado inicial das quantidade
  const quantidadeInicial: { [key: number]: number } = {};
  itens.forEach((item) => {
    quantidadeInicial[item.Handle] = 0;
  });
  const [quantidade, setQuantidade] = useState(quantidadeInicial);

  const itensFiltrados = itens.filter(
    (item) =>
      handleGrupo2 ===
      (Array.isArray(item.HandleGrupo2)
        ? item.HandleGrupo2.join(",")
        : String(item.HandleGrupo2))
  );

  // Função para atualizar a quantidade de um item
  const atualizarQuantidade = (itemId: number, newQuantity: number) => {
    setQuantidade((prevQuantidade) => ({
      ...prevQuantidade,
      [itemId]: newQuantity,
    }));
  };

  const confirmarItens = () => {
    const itensConfirmados = itensFiltrados.filter(
      (item) => quantidade[item.Handle] > 0
    );

    const itensConfirmadosComQuantidadeAtualizada = itensConfirmados.map(
      (item) => ({
        ...item,
        Quantidade: quantidade[item.Handle],
      })
    );

    order.push(...itensConfirmadosComQuantidadeAtualizada);
  };

  const renderizar = ({ item }: { item: interface_itens }) => (
    <Box
      flex={1}
      height={130}
      bg="white"
      m={"sm"}
      borderRadius={8}
      elevation={2}
      flexDirection="row"
      overflow="hidden"
      p="sm"
      g="sm"
    >
      <Box width={130} overflow="hidden" borderRadius={8}>
        <Base64Image base64Image={item.FotoBase64} />
      </Box>
      <Box flex={1} justifyContent="space-between" p="s">
        <Text fontSize={22} fontWeight="bold" numberOfLines={2}>
          {item.Descricao}
        </Text>
        <Text fontSize={20} fontWeight="bold">
          {formatarParaMoeda(item.VendaValor ?? 0)}
        </Text>
        <Box position="absolute" bottom={0} right={0}>
          <AmountManager
            amount={quantidade[item.Handle]}
            increase={() =>
              atualizarQuantidade(item.Handle, quantidade[item.Handle] + 1)
            }
            decrease={() =>
              atualizarQuantidade(
                item.Handle,
                Math.max(0, quantidade[item.Handle] - 1)
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box flex={1}>
      <FlashList
        data={itensFiltrados}
        renderItem={renderizar}
        estimatedItemSize={146}
      />
      <Box m={"sm"}>
        <Button
          title="Confirmar"
          color={THEME.colors.Alert}
          onPress={confirmarItens}
        />
      </Box>
    </Box>
  );
}
