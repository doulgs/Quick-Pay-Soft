import { API } from "@/services";

interface APIResponse {
  IsValid: boolean;
  Message: string;
  Data: DataAPI; // ajuste o tipo conforme necessário
}

interface DataAPI {
  grupos2: [];
  grupoExcecoes: [];
  excecoes: [];
  itens: [];
  execaoAuto: [];
  grupos3: [];
  condicoes: [];
}

async function buscarDadosAPI(
  token: string,
  siteName: string
): Promise<APIResponse> {
  try {
    // Realizando a sincronização com o servidor
    const response = await API.get(`/pbl/smart/sync?siteName=${siteName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    if (!data.IsValid) {
      throw new Error(data.Message || "Erro desconhecido na API");
    }

    return data as APIResponse;
  } catch (err) {
    console.error("Erro ao buscar dados na API:", err);
    throw new Error(`Erro ao buscar dados na API: ${err}`);
  }
}

export { buscarDadosAPI };
