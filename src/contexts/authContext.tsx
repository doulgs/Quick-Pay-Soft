import { useState, useContext, createContext, useEffect } from "react";
import { Alert } from "react-native";
import { obterToken } from "@/utils/helpers/obterToken";
import { registrarDispositivo } from "@/utils/helpers/registrarDispositivo";
import { useFilialRepository } from "@/database/useFilialRepository";
import { useAppConfigRepository } from "@/database/useAppConfigRepository";
import { router } from "expo-router";

interface AuthContextProps {
  cadastrarDispositivo: (data: cadDispositivo) => Promise<void>;
}

interface cadDispositivo {
  usuario: string;
  senha: string;
  chaveEmpresa: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvaider = ({ children }: any) => {
  const useFilial = useFilialRepository();
  const useAppConfig = useAppConfigRepository();

  async function cadastrarDispositivo({
    chaveEmpresa,
    usuario,
    senha,
  }: cadDispositivo) {
    try {
      const token = await obterToken(usuario, senha);
      const retorno = await registrarDispositivo(token, chaveEmpresa);

      //Verifica se a Filial existe
      if (retorno?.Data === null) {
        Alert.alert("Informações", `${retorno?.Message}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }

      //Verifica se o aparelho já esta registrado no Banco de Dados Web
      if (retorno?.Message === "Aparelho já registrado na base de dados!") {
        Alert.alert("Informações", `${retorno?.Message}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }

      await gravarFilial(retorno?.Data.Filial).then(async () => {
        useAppConfig.createOrUpdate({
          NomeSite: retorno?.Data.Filial.NomeSite,
          usuariointegracao: usuario,
          senhaintegracao: senha,
        });

        await gravarUsuarios(retorno?.Data.Usuarios).then(() => {
          router.replace("/");
        });
      });
    } catch (error) {
      console.log("Erro no processo de cadastroDispositivo", error);
    }
  }

  async function gravarFilial(retorno: any) {
    try {
      useFilial.createOrUpdate({
        Handle: retorno.Handle,
        Nome: retorno.Nome,
        Razao: retorno.Razao,
        Fone: retorno.Fone,
        CnpjCpf: retorno.CnpjCpf,
        NomeSite: retorno.NomeSite,
        Endereco: retorno.Endereco,
        Numero: retorno.Numero,
        Complemento: retorno.Complemento,
        Bairro: retorno.Bairro,
        Cep: retorno.Cep,
        Cidade: retorno.Cidade,
        Estado: retorno.Estado,
        NumeroWhatsAppPedido: retorno.NumeroWhatsAppPedido,
      });
    } catch (error) {
      console.error("Erro ao gravar filial", error);
      throw error;
    }
  }

  async function gravarUsuarios(retorno: any) {
    //##TODO CONTINUAR AQUI GRAVAR OS USUARIOS
    console.log("gravarUsuarios", Array.from(retorno).length);
  }

  async function acessar(login: string, senha: string) {}

  async function signOut() {}

  return (
    <AuthContext.Provider value={{ cadastrarDispositivo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
