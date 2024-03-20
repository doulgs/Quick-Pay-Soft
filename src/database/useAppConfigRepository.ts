import { useSQLiteContext } from "expo-sqlite/next";

export type AppConfigCreateDatabase = {
  NomeSite: number;
  usuariointegracao: string;
  senhaintegracao: string;
  Created_at?: string;
};

export function useAppConfigRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(appconfig: AppConfigCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM appconfig WHERE NomeSite = ?`,
        [appconfig.NomeSite]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE appconfig SET
          usuariointegracao = ?,
          senhaintegracao = ?
          WHERE NomeSite = ?`
        );

        statement.executeSync([
          appconfig.usuariointegracao,
          appconfig.senhaintegracao,
          appconfig.NomeSite,
        ]);

        console.log("appconfig -->", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO appconfig
            (NomeSite, usuariointegracao, senhaintegracao)
           VALUES
            (?, ?, ?)`
        );

        statement.executeSync([
          appconfig.NomeSite,
          appconfig.usuariointegracao,
          appconfig.senhaintegracao,
        ]);

        console.log("appconfig -->", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      const statement = database.prepareSync(
        `SELECT g.NomeSite, g.usuariointegracao, g.senhaintegracao FROM appconfig AS g`
      );
      const result = statement.executeSync<AppConfigCreateDatabase>();
      return result.getFirstSync();
    } catch (error) {
      console.error("Erro ao buscar appconfig:", error);
      throw new Error(`Erro ao buscar appconfig: ${error}`);
    }
  }

  return { createOrUpdate, all };
}