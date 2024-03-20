import { useSQLiteContext } from "expo-sqlite/next";

export type ExecaoAutoCreateDatabase = {
  Handle: number;
  HandleExcecao: number;
  HandleItem: number;
  Quantidade: number;
  Plataforma: string;
  Created_at?: string;
};

export function useExecaoAutoRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(execaoAuto: ExecaoAutoCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM execaoAuto WHERE Handle = ?`,
        [execaoAuto.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE execaoAuto SET
          HandleExcecao = ?,
          HandleItem = ?,
          Quantidade = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          execaoAuto.HandleExcecao,
          execaoAuto.HandleItem,
          execaoAuto.Quantidade,
          execaoAuto.Plataforma,
          execaoAuto.Handle,
        ]);

        console.log("ExecaoAuto --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO execaoAuto
            (Handle, HandleExcecao, HandleItem, Quantidade, Plataforma)
           VALUES
            (?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          execaoAuto.Handle,
          execaoAuto.HandleExcecao,
          execaoAuto.HandleItem,
          execaoAuto.Quantidade,
          execaoAuto.Plataforma,
        ]);

        console.log("ExecaoAuto --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<ExecaoAutoCreateDatabase>(`
        SELECT * FROM execaoAuto
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
