import { useSQLiteContext } from "expo-sqlite/next";

export type FilialCreateDatabase = {
  Handle: number;
  Nome: string;
  Razao: string;
  Fone: string;
  CnpjCpf: string;
  NomeSite: string;
  Endereco: string;
  Numero: string;
  Complemento: string;
  Bairro: string;
  Cep: string;
  Cidade: string;
  Estado: string;
  NumeroWhatsAppPedido: string;
  Created_at?: string;
};

export function useFilialRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(filial: FilialCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM filial WHERE Handle = ?`,
        [filial.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE filial SET
          Nome = ?,
          Razao = ?,
          Fone = ?,
          CnpjCpf = ?,
          NomeSite = ?,
          Endereco = ?,
          Numero = ?,
          Complemento = ?,
          Bairro = ?,
          Cep = ?,
          Cidade = ?,
          Estado = ?,
          NumeroWhatsAppPedido = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          filial.Nome,
          filial.Razao,
          filial.Fone,
          filial.CnpjCpf,
          filial.NomeSite,
          filial.Endereco,
          filial.Numero,
          filial.Complemento,
          filial.Bairro,
          filial.Cep,
          filial.Cidade,
          filial.Estado,
          filial.NumeroWhatsAppPedido,
          filial.Handle,
        ]);

        console.log("Filial --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO filial
            (Handle, Nome, Razao, Fone, CnpjCpf, NomeSite, Endereco, Numero, Complemento, Bairro, Cep, Cidade, Estado, NumeroWhatsAppPedido)
           VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          filial.Handle,
          filial.Nome,
          filial.Razao,
          filial.Fone,
          filial.CnpjCpf,
          filial.NomeSite,
          filial.Endereco,
          filial.Numero,
          filial.Complemento,
          filial.Bairro,
          filial.Cep,
          filial.Cidade,
          filial.Estado,
          filial.NumeroWhatsAppPedido,
        ]);

        console.log("Filial --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getFirstSync<FilialCreateDatabase>(`
        SELECT * FROM filial
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
