import { useState, useContext, createContext, useEffect } from "react";
import { Alert } from "react-native";
import { obterToken } from "@/utils/helpers/obterToken";
import { registrarDispositivo } from "@/utils/helpers/registrarDispositivo";
import { useFilialRepository } from "@/database/useFilialRepository";
import { useAppConfigRepository } from "@/database/useAppConfigRepository";
import { router } from "expo-router";
import { useUsuarioRepository } from "@/database/useUsuarioRepository";

interface AuthContextProps {
  cadastrarDispositivo: (data: cadDispositivo) => Promise<void>;
  acessar: (usuario: string, senhaMDS: string) => void;
  signOut: () => void;
}

interface cadDispositivo {
  usuario: string;
  senha: string;
  chaveEmpresa: string;
}

interface Usuario {
  Login: string;
  Senha: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvaider = ({ children }: any) => {
  const useFilial = useFilialRepository();
  const useAppConfig = useAppConfigRepository();
  const useUsuario = useUsuarioRepository();

  const [user, setUser] = useState<Usuario>({} as Usuario);

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
    const usuarios = Array.from(retorno).filter(
      (retorno: any) => retorno.Solucao === "POS"
    );

    usuarios.forEach(async (usuario: any) => {
      await useUsuario.createOrUpdate({
        Handle: usuario.Handle,
        HandleFilial: usuario.HandleFilial,
        Login: usuario.Login,
        Nome: usuario.Nome,
        Plataforma: usuario.Plataforma,
        Role: usuario.Role,
        Senha: usuario.Senha,
      });
    });
  }

  async function acessar(usuario: string, senhaMDS: string) {
    const retorno = useUsuario.search(usuario);
    if (retorno) {
      if (retorno.Login === usuario && retorno.Senha === senhaMDS) {
        router.replace("/(stack)");
      }
    }
  }

  async function signOut() {
    Alert.alert("Sair", `Deseja realmente finalizar a aplicação?`, [
      {
        text: "Não",
        onPress: () => {},
        style: "cancel",
      },
      { text: "SIM", onPress: () => router.replace("/") },
    ]);
  }

  return (
    <AuthContext.Provider value={{ cadastrarDispositivo, acessar, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
