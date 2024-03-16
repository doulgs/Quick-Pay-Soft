import { Linking, ToastAndroid } from "react-native";
import { imageHeader } from "./imageHeader";
import { obterDataHora } from "@/utils/helpers/obterDataHora";

interface UrlParams {
  SUCCESS?: string;
}

const enviarImpressao = async (jsonFile: string) => {
  const uri = `printer-app://print?SHOW_FEEDBACK_SCREEN=false&SCHEME_RETURN=linkpublipos&PRINTABLE_CONTENT=${encodeURIComponent(
    jsonFile
  )}`;

  try {
    const canOpen = await Linking.canOpenURL(uri);
    if (canOpen) {
      await Linking.openURL(uri);
    } else {
      ToastAndroid.show(
        "Não é possível abrir o aplicativo de impressão.",
        ToastAndroid.SHORT
      );
    }
  } catch (error) {
    console.error("Erro ao enviar a impressão:", error);
    ToastAndroid.show("Erro ao enviar a impressão", ToastAndroid.SHORT);
  }
};

const handleImpressao = async (order: Item[], user: UsuarioProp) => {
  const printPedido = [];

  for (let o = 0; o < order.length; o++) {
    for (let i = 0; i < order[o].Amount; i++) {
      const { img } = await imageHeader();
      const filial = `${user.NomeEmpresa}`;
      const dataHora = `${obterDataHora().dataHoraAtual}`;

      const excecoes = order[o].Excecoes.filter((value) => value.Amount >= 1)
        .map((value) => `\n \u2022 x${value.Amount ?? 0} ${value.Excecao}`)
        .join("");
      const conteudo = `x1 - ${order[o].Descricao}${excecoes}`;

      printPedido.push({
        type: "image",
        imagePath: `${img}`,
      });
      printPedido.push({
        type: "text",
        content: filial,
        align: "left",
        size: "medium",
      });
      printPedido.push({
        type: "text",
        content: dataHora,
        align: "left",
        size: "medium",
      });
      printPedido.push({
        type: "text",
        content: "VALE",
        align: "center",
        size: "big",
      });
      printPedido.push({
        type: "text",
        content: conteudo,
        align: "left",
        size: "big",
      });
      printPedido.push({
        type: "line",
        content: " ",
      });
      printPedido.push({
        type: "line",
        content: "----------------------------------",
      });
      printPedido.push({
        type: "line",
        content: " ",
      });
    }
  }
  return JSON.stringify(printPedido);
};

const processarImpressao = (
  order: Item[],
  user: UsuarioProp
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const handleImpressaoReturn = async (event: { url: string }) => {
      console.log("DeepLink Impressao -->:", event.url);
      const url = new URL(event.url);
      const params = new URLSearchParams(url.search);

      const extractedParams: UrlParams = {
        SUCCESS: params.get("DEEPLINK_RETURN") ?? undefined,
      };

      if (extractedParams.SUCCESS === "SUCCESS") {
        console.log("Impressão realizada com sucesso.");
        resolve();
      } else {
        reject(new Error("Erro na impressão."));
      }
    };

    Linking.addEventListener("url", handleImpressaoReturn);

    // Inicializa a impressão do primeiro item
    if (order.length > 0 && user !== null) {
      const arquivoJSON = await handleImpressao(order, user);
      await enviarImpressao(arquivoJSON);
      console.log("Fim da Impressão");
    }

    return () => {
      Linking.removeAllListeners("url");
    };
  });
};

export { processarImpressao };
