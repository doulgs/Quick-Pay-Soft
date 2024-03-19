import { useSQLiteContext } from "expo-sqlite/next";

export type ExcecoesCreateDatabase = {
  Handle: number;
  HandleGrupoExcecao: number;
  HandleGrupo2: number;
  HandleItem: string;
  IteHandle: string;
  Ordem: string;
  Excecao: string;
  Plataforma: string;
  Created_at?: string;
};

export function useExcecoesRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(excecoes: ExcecoesCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM excecoes WHERE Handle = ?`,
        [excecoes.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE excecoes SET
          HandleGrupoExcecao = ?,
          HandleGrupo2 = ?,
          HandleItem = ?,
          IteHandle = ?,
          Ordem = ?,
          Excecao = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          excecoes.HandleGrupoExcecao,
          excecoes.HandleGrupo2,
          excecoes.HandleItem,
          excecoes.IteHandle,
          excecoes.Ordem,
          excecoes.Excecao,
          excecoes.Plataforma,
          excecoes.Handle,
        ]);

        console.log("Excecoes --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO excecoes
            (Handle, HandleGrupoExcecao, HandleGrupo2, HandleItem, IteHandle, Ordem, Excecao, Plataforma)
           VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          excecoes.Handle,
          excecoes.HandleGrupoExcecao,
          excecoes.HandleGrupo2,
          excecoes.HandleItem,
          excecoes.IteHandle,
          excecoes.Ordem,
          excecoes.Excecao,
          excecoes.Plataforma,
        ]);

        console.log("Excecoes --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<ExcecoesCreateDatabase>(`
        SELECT * FROM excecoes
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
