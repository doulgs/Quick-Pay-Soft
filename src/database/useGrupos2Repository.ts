import { useSQLiteContext } from "expo-sqlite/next";

export type Grupos2CreateDatabase = {
  Handle: number;
  Codigo: string;
  Nome: string;
  Reduzido: string;
  FotoBase64: string;
  PossuiComposicao: number;
  Plataforma: string;
  Created_at?: string;
};

export function useGrupos2Repository() {
  const database = useSQLiteContext();

  function createOrUpdate(grupos2: Grupos2CreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM grupos2 WHERE Handle = ?`,
        [grupos2.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE grupos2 SET
          Codigo = ?,
          Nome = ?,
          Reduzido = ?,
          FotoBase64 = ?,
          PossuiComposicao = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          grupos2.Codigo,
          grupos2.Nome,
          grupos2.Reduzido,
          grupos2.FotoBase64,
          grupos2.PossuiComposicao,
          grupos2.Plataforma,
          grupos2.Handle,
        ]);

        console.log("Grupos2 --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO grupos2
            (Handle, Codigo, Nome, Reduzido, FotoBase64, PossuiComposicao, Plataforma)
           VALUES
            (?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          grupos2.Handle,
          grupos2.Codigo,
          grupos2.Nome,
          grupos2.Reduzido,
          grupos2.FotoBase64,
          grupos2.PossuiComposicao,
          grupos2.Plataforma,
        ]);

        console.log("Grupos2 --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<Grupos2CreateDatabase>(`
        SELECT * FROM grupos2
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
