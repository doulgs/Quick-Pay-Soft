import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";

import { THEME, ThemeProps } from "@/theme";
import { createBox, createText } from "@shopify/restyle";

import { useAuth } from "@/contexts/authContext";
import { deleteTables } from "@/database/deleteTables";
import {
  InfoDispositivoProps,
  obterInformacoesDispositivo,
} from "@/utils/helpers/obterInformacoesDispositivo";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Configuracao() {
  const { cadastrarDispositivo } = useAuth();
  const { limparTabelas } = deleteTables();

  const [chaveEmpresa, setChaveEmpresa] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [infoDevice, setInfoDevice] = useState<
    InfoDispositivoProps | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  function handleCadastrarDispositivo() {
    if (chaveEmpresa !== "" && usuario !== "" && senha !== "") {
      setLoading(true);
      cadastrarDispositivo({ chaveEmpresa, usuario, senha });
      setLoading(false);
    } else {
      alert("Preencha todos os campos");
    }
  }

  function handleLimparDados() {
    Alert.alert(
      "Atenção",
      `TODOS OS DADOS SERÃO EXCLUIDOS PERMANENTEMENTE.. Deseja realmente deletar todas as informações do aplicativo? Não é possivel reverter essa operação.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Desejo deletar",
          style: "default",
          onPress: async () => {
            setLoading(true);
            await limparTabelas();
            setLoading(false);
          },
        },
      ]
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Configurações" />
      <ScrollView style={{ backgroundColor: THEME.colors.almostWhite }}>
        <Box flex={1} backgroundColor="almostWhite">
          <Box flex={1} p={"md"} gap="md">
            <Text fontSize={16} fontWeight="bold">
              Informações da empresa
            </Text>
            <Input
              placeholder={`Chave da empresa:`}
              value={chaveEmpresa}
              onChangeText={(t) => setChaveEmpresa(t)}
            />
            <Input
              placeholder={`usuario:`}
              value={usuario}
              onChangeText={(t) => setUsuario(t)}
            />
            <Input
              placeholder={`senha:`}
              value={senha}
              onChangeText={(t) => setSenha(t)}
            />
            <Text fontSize={16} fontWeight="bold">
              Informações do dispositivo
            </Text>
            {infoDevice && (
              <>
                <Input placeholder={`UUID: ${infoDevice.uniqueId}`} readOnly />
                <Input placeholder={`Modelo: ${infoDevice.Modelo}`} readOnly />
                <Input
                  placeholder={`Plataforma: ${infoDevice.Plataforma}`}
                  readOnly
                />
                <Input placeholder={`Versão: ${infoDevice.Versao}`} readOnly />
              </>
            )}
            {error && <Text>Error: {error}</Text>}

            <Box gap="md" mt="lg">
              <Button
                title="Cadastrar Dispositivo"
                onPress={handleCadastrarDispositivo}
                isLoading={loading}
              />
              <Button
                title="Limpar Banco de Dados"
                onPress={handleLimparDados}
                isLoading={loading}
              />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </>
  );
}
