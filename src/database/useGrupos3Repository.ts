import { useSQLiteContext } from "expo-sqlite/next";

export type Grupos3CreateDatabase = {
  Handle: number;
  Codigo: string;
  Nome: string;
  Nome2: string;
  Reduzido: string;
  QuantidadeItensComposicao: number;
  Plataforma: string;
  Created_at?: string;
};

export function useGrupos3Repository() {
  const database = useSQLiteContext();

  function createOrUpdate(grupos3: Grupos3CreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM grupos3 WHERE Handle = ?`,
        [grupos3.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE grupos3 SET
          Codigo = ?,
          Nome = ?,
          Nome2 = ?,
          Reduzido = ?,
          QuantidadeItensComposicao = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          grupos3.Codigo,
          grupos3.Nome,
          grupos3.Nome2,
          grupos3.Reduzido,
          grupos3.QuantidadeItensComposicao,
          grupos3.Plataforma,
          grupos3.Handle,
        ]);

        console.log("Grupos3 --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO grupos3
            (Handle, Codigo, Nome, Nome2, Reduzido, QuantidadeItensComposicao, Plataforma)
           VALUES
            (?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          grupos3.Handle,
          grupos3.Codigo,
          grupos3.Nome,
          grupos3.Nome2,
          grupos3.Reduzido,
          grupos3.QuantidadeItensComposicao,
          grupos3.Plataforma,
        ]);

        console.log("Grupos3 --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<Grupos3CreateDatabase>(`
        SELECT * FROM grupos3
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
