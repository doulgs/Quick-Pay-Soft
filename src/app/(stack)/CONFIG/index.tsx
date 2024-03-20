import { useState } from "react";
import { createBox } from "@shopify/restyle";
import { ThemeProps } from "@/theme";
import { Button } from "@/components/Button";
import { obterToken } from "@/utils/helpers/obterToken";

//Database
import { buscarDadosAPI } from "@/utils/helpers/buscarDadosAPI";
import { useAppConfigRepository } from "@/database/useAppConfigRepository";
import { useFilialRepository } from "@/database/useFilialRepository";
import { useGrupos2Repository } from "@/database/useGrupos2Repository";
import { useGrupoExcecoesRepository } from "@/database/useGrupoExcecoesRepository";
import { useExcecoesRepository } from "@/database/useExcecoesRepository";
import { useItensRepository } from "@/database/useItensRepository";
import { useExecaoAutoRepository } from "@/database/useExecaoAutoRepository";
import { useGrupos3Repository } from "@/database/useGrupos3Repository";
import { useCondicoesRepository } from "@/database/useCondicoesRepository";
import { Loading } from "@/components/Loading";

const Box = createBox<ThemeProps>();

export default function Config() {
  const grupos2Repository = useGrupos2Repository();
  const grupoExcecoesRepository = useGrupoExcecoesRepository();
  const excecoesRepository = useExcecoesRepository();
  const itensRepository = useItensRepository();
  const excecaoAutoRepository = useExecaoAutoRepository();
  const grupos3Repository = useGrupos3Repository();
  const condicoesRepository = useCondicoesRepository();

  const appconfigResquest = useAppConfigRepository();
  const filialRequest = useFilialRepository();

  const appconfig = appconfigResquest.all();
  const filial = filialRequest.all();

  const [isloading, setIsLoading] = useState(false);

  async function realizarSync() {
    console.log("Inicio");
    setIsLoading(true);
    if (appconfig && filial) {
      try {
        const token = await obterToken(
          appconfig?.usuariointegracao,
          appconfig?.senhaintegracao
        );
        if (filial.NomeSite !== null) {
          const retorno = await buscarDadosAPI(token, filial.NomeSite);
          if (retorno) {
            await Promise.all([
              syncData(retorno.Data.grupos2, grupos2Repository.createOrUpdate),
              syncData(
                retorno.Data.grupoExcecoes,
                grupoExcecoesRepository.createOrUpdate
              ),
              syncData(
                retorno.Data.excecoes,
                excecoesRepository.createOrUpdate
              ),
              syncData(retorno.Data.itens, itensRepository.createOrUpdate),
              syncData(
                retorno.Data.execaoAuto,
                excecaoAutoRepository.createOrUpdate
              ),
              syncData(retorno.Data.grupos3, grupos3Repository.createOrUpdate),
              syncData(
                retorno.Data.condicoes,
                condicoesRepository.createOrUpdate
              ),
            ]);
          }
        }
      } catch (error) {
        console.error(`Erro ao realizar o sync - ${error}`);
      }
    }
    setIsLoading(false);
  }

  async function syncData(data: any[], updater: (item: any) => void) {
    data.forEach((item) => updater(item));
  }

  if (isloading) {
    return <Loading />;
  }

  return (
    <Box flex={1} p={"md"} bg="almostWhite">
      <Button title="Realizar sync" onPress={realizarSync}></Button>
    </Box>
  );
}
