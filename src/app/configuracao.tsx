import React, { useState, useEffect } from "react";
import { ScrollView, StatusBar } from "react-native";

import { createBox, createText } from "@shopify/restyle";
import { THEME, ThemeProps } from "@/theme";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

import {
  obterInformacoesDispositivo,
  InfoDispositivoProps,
} from "@/utils/helpers/obterInformacoesDispositivo";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Configuracao() {
  const [infoDevice, setInfoDevice] = useState<
    InfoDispositivoProps | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function DadosDispositivo() {
      try {
        const dispositivo = await obterInformacoesDispositivo();
        if ("infoDispositivo" in dispositivo) {
          setInfoDevice(dispositivo.infoDispositivo);
          setError(undefined);
        } else if ("error" in dispositivo) {
          setError(dispositivo.error);
        }
      } catch (error) {
        console.error("Erro ao obter informações do dispositivo:", error);
        setError(`Erro ao obter informações do dispositivo, ${error}`);
      }
    }

    DadosDispositivo();
  }, []);

  function handleCadastrarDispositivo() {}
  function handleLimparDados() {}

  return (
    <>
      <Header title="Configurações" />
      <ScrollView style={{ backgroundColor: THEME.colors.almostWhite }}>
        <Box flex={1} backgroundColor="almostWhite">
          <Box flex={1} p={"md"} gap="md">
            <Text fontSize={16} fontWeight="bold">
              Informações da empresa
            </Text>
            <Input placeholder={`Chave da empresa:`} />
            <Input placeholder={`usuario:`} />
            <Input placeholder={`senha:`} />
            <Text fontSize={16} fontWeight="bold">
              Informações do dispositivo
            </Text>
            {infoDevice && (
              <>
                <Input
                  placeholder={`UUID: ${infoDevice.uniqueId}`}
                  editable={false}
                />
                <Input
                  placeholder={`Modelo: ${infoDevice.Modelo}`}
                  editable={false}
                />
                <Input
                  placeholder={`Plataforma: ${infoDevice.Plataforma}`}
                  editable={false}
                />
                <Input
                  placeholder={`Versão: ${infoDevice.Versao}`}
                  editable={false}
                />
              </>
            )}
            {error && <Text>Error: {error}</Text>}

            <Box gap="md" mt="lg">
              <Button
                title="Cadastrar Dispositivo"
                onPress={handleCadastrarDispositivo}
              />
              <Button
                title="Limpar Banco de Dados"
                onPress={handleLimparDados}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
