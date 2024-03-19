import { useSQLiteContext } from "expo-sqlite/next";

export type GrupoExcecoesCreateDatabase = {
  Handle: number;
  HandleGrupo2: number;
  Ordem: string;
  Descricao: string;
  Plataforma: string;
  Created_at?: string;
};

export function useGrupoExcecoesRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(grupoExcecoes: GrupoExcecoesCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM grupoExcecoes WHERE Handle = ?`,
        [grupoExcecoes.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE grupoExcecoes SET
          HandleGrupo2 = ?,
          Ordem = ?,
          Descricao = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          grupoExcecoes.HandleGrupo2,
          grupoExcecoes.Ordem,
          grupoExcecoes.Descricao,
          grupoExcecoes.Plataforma,
          grupoExcecoes.Handle,
        ]);

        console.log("GrupoExcecoes --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO grupoExcecoes
            (Handle, HandleGrupo2, Ordem, Descricao, Plataforma)
           VALUES
            (?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          grupoExcecoes.Handle,
          grupoExcecoes.HandleGrupo2,
          grupoExcecoes.Ordem,
          grupoExcecoes.Descricao,
          grupoExcecoes.Plataforma,
        ]);

        console.log(
          "GrupoExcecoes --> ",
          "Novo registro inserido com sucesso!"
        );
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<GrupoExcecoesCreateDatabase>(`
        SELECT * FROM grupoExcecoes
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
