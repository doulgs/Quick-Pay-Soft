import { useSQLiteContext } from "expo-sqlite/next";

export type CondicoesCreateDatabase = {
  Handle: number;
  TipoPagto: string;
  Descricao: string;
  EhDinheiro: number;
  Plataforma: string;
  Ativo: number;
  CodigoIntegracao: string;
  TipoParcelamentoPos: string;
  QtdParcelas: number;
  Created_at?: string;
};

export function useCondicoesRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(condicoes: CondicoesCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM condicoes WHERE Handle = ?`,
        [condicoes.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE condicoes SET
          TipoPagto = ?,
          Descricao = ?,
          EhDinheiro = ?,
          Plataforma = ?,
          Ativo = ?,
          CodigoIntegracao = ?,
          TipoParcelamentoPos = ?,
          QtdParcelas = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          condicoes.TipoPagto,
          condicoes.Descricao,
          condicoes.EhDinheiro,
          condicoes.Plataforma,
          condicoes.Ativo,
          condicoes.CodigoIntegracao,
          condicoes.TipoParcelamentoPos,
          condicoes.QtdParcelas,
          condicoes.Handle,
        ]);

        console.log("Condicoes --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO condicoes
            (Handle, TipoPagto, Descricao, EhDinheiro, Plataforma, Ativo, CodigoIntegracao, TipoParcelamentoPos, QtdParcelas)
           VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          condicoes.Handle,
          condicoes.TipoPagto,
          condicoes.Descricao,
          condicoes.EhDinheiro,
          condicoes.Plataforma,
          condicoes.Ativo,
          condicoes.CodigoIntegracao,
          condicoes.TipoParcelamentoPos,
          condicoes.QtdParcelas,
        ]);

        console.log("Condicoes --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<CondicoesCreateDatabase>(`
        SELECT * FROM condicoes
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
