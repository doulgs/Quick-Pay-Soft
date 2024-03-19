import { useSQLiteContext } from "expo-sqlite/next";

export type UsuarioCreateDatabase = {
  Handle: number;
  HandleFilial: number;
  Login: string;
  Senha: string;
  Nome: string;
  Role: string;
  Plataforma: string;
  Created_at?: string;
};

export function useUsuarioRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(usuario: UsuarioCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM usuario WHERE Handle = ?`,
        [usuario.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE usuario SET
      HandleFilial = ?,
      Login = ?,
      Senha = ?,
      Nome = ?,
      Role = ?,
      Plataforma = ?
      WHERE Handle = ?`
        );

        statement.executeSync([
          usuario.HandleFilial,
          usuario.Login,
          usuario.Senha,
          usuario.Nome,
          usuario.Role,
          usuario.Plataforma,
          usuario.Handle,
        ]);

        console.log("Usuario --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO usuario
        (Handle, HandleFilial, Login, Senha, Nome, Role, Plataforma)
       VALUES
        (?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          usuario.Handle,
          usuario.HandleFilial,
          usuario.Login,
          usuario.Senha,
          usuario.Nome,
          usuario.Role,
          usuario.Plataforma,
        ]);

        console.log("Usuario --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<UsuarioCreateDatabase>(`
    SELECT * FROM usuario
  `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
