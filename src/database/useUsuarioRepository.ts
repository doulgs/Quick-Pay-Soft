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
export type UsuarioResponseDatabase = {
  Login: string;
  Senha: string;
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
  function search(login: string) {
    try {
      const statement = database.prepareSync(
        `SELECT g.Login, g.Senha
          FROM usuario AS g
          WHERE Login = $login`
      );
      const result = statement.executeSync<UsuarioResponseDatabase>({
        $login: login,
      });
      return result.getFirstSync();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error(`Erro ao buscar usuário: ${error}`);
    }
  }

  return { createOrUpdate, all, search };
}
