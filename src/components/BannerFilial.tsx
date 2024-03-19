import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { useEffect, useState } from "react";
import {
  FilialCreateDatabase,
  useFilialRepository,
} from "@/database/useFilialRepository";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

function BannerFilial() {
  const { all } = useFilialRepository();

  const [filial, setFilial] = useState<FilialCreateDatabase>(
    {} as FilialCreateDatabase
  );

  useEffect(() => {
    function getDadoFilial() {
      const retorno = all();
      if (retorno) {
        setFilial(retorno);
      }
    }

    getDadoFilial();
  }, []);
  return (
    <Box
      backgroundColor="white"
      width={"auto"}
      height={150}
      borderRadius={16}
      elevation={2}
      p="sm"
    >
      <Text
        fontSize={24}
        fontStyle="italic"
        fontWeight="bold"
        textAlign="center"
      >
        {filial.Nome}
      </Text>
      <Text>
        <Text fontWeight="bold">Razão Social:</Text> {filial.Razao}
      </Text>
      <Text>
        <Text fontWeight="bold">CNPJ/CPF:</Text> {filial.CnpjCpf}
      </Text>
      <Text>
        <Text fontWeight="bold">Contato:</Text> {filial.Fone}
      </Text>
      <Text>
        <Text fontWeight="bold">Endereço:</Text> {filial.Endereco} -{" "}
        {filial.Bairro} - {filial.Cep} -{filial.Cidade} {filial.Estado}
      </Text>
    </Box>
  );
}
export { BannerFilial };
