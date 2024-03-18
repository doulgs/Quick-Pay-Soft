import { API } from "@/services";
import { obterInformacoesDispositivo } from "./obterInformacoesDispositivo";

async function registrarDispositivo(token: string, chaveEmpresa: string) {
  try {
    const Dispositivo = await obterInformacoesDispositivo();
    if (Dispositivo && Dispositivo.infoDispositivo) {
      const { data } = await API.post(
        "/pbl/Filial/CadastrarAparelho",
        {
          ChaveApps: chaveEmpresa,
          UUID: Dispositivo.infoDispositivo?.uniqueId,
          Modelo: Dispositivo.infoDispositivo?.Modelo,
          Dispositivo: `Android-${Dispositivo.infoDispositivo?.Versao}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { IsValid, Message, Data } = data;
      return { IsValid, Message, Data };
    }
  } catch (err) {
    console.error("Erro ao viincular dispositivo com a empresa", err);
    alert(`Erro ao viincular dispositivo com a empresa: ${err}`);
  }
}

export { registrarDispositivo };
