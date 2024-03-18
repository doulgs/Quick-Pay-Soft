import { useSQLiteContext } from "expo-sqlite/next";

export function deleteTables() {
  const database = useSQLiteContext();

  async function limparTabelas() {
    try {
      // Limpar tabela appconfig
      await database.execAsync(`DELETE FROM appconfig`);

      // Limpar tabela grupos2
      await database.execAsync(`DELETE FROM grupos2`);

      // Limpar tabela grupoExcecoes
      await database.execAsync(`DELETE FROM grupoExcecoes`);

      // Limpar tabela excecoes
      await database.execAsync(`DELETE FROM excecoes`);

      // Limpar tabela itens
      await database.execAsync(`DELETE FROM itens`);

      // Limpar tabela condicoes
      await database.execAsync(`DELETE FROM condicoes`);

      // Limpar tabela filial
      await database.execAsync(`DELETE FROM filial`);

      // Limpar tabela usuario
      await database.execAsync(`DELETE FROM usuario`);

      console.log("Todas as tabelas foram limpas com sucesso.");
    } catch (error) {
      console.error("Erro ao limpar as tabelas:", error);
      throw error;
    }
  }

  return { limparTabelas };
}
