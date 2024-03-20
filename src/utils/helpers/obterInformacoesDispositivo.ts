import * as Device from "expo-device";
import DeviceInfo from "react-native-device-info";

export interface InfoDispositivoProps {
  uniqueId: string;
  Modelo: string | null;
  Plataforma: string | null;
  Versao: string | null;
}

const obterInformacoesDispositivo = async () => {
  try {
    const uniqueId = await DeviceInfo.getUniqueId();
    const Plataforma = Device.osName;
    const Modelo = Device.modelName;
    const Versao = Device.osVersion;

    const infoDispositivo: InfoDispositivoProps = {
      uniqueId,
      Plataforma,
      Modelo,
      Versao,
    };

    return { infoDispositivo };
  } catch (error) {
    console.error("Erro ao obter informações do dispositivo:", error);
    return {
      error: "Erro ao obter informações do dispositivo",
    };
  }
};

export { obterInformacoesDispositivo };
