import { useSQLiteContext } from "expo-sqlite/next";

export type ItensCreateDatabase = {
  Handle: number;
  Codigo: string;
  Descricao: string;
  DescLonga: string;
  DescReduzida: string;
  ComposicaoBarra: string;
  Quantidade: number;
  HandleGrupo2: number;
  HandleGrupo3: number;
  FotoBase64: string;
  Observacao: string;
  VendaValor: number;
  Unidade: string;
  Plataforma: string;
  Created_at?: string;
};

export function useItensRepository() {
  const database = useSQLiteContext();

  function createOrUpdate(itens: ItensCreateDatabase) {
    try {
      const existingEntry = database.getAllSync(
        `SELECT * FROM itens WHERE Handle = ?`,
        [itens.Handle]
      );

      if (existingEntry && existingEntry.length > 0) {
        // Se o registro já existir, execute um UPDATE
        const statement = database.prepareSync(
          `UPDATE itens SET
          Codigo = ?,
          Descricao = ?,
          DescLonga = ?,
          DescReduzida = ?,
          ComposicaoBarra = ?,
          Quantidade = ?,
          HandleGrupo2 = ?,
          HandleGrupo3 = ?,
          FotoBase64 = ?,
          Observacao = ?,
          VendaValor = ?,
          Unidade = ?,
          Plataforma = ?
          WHERE Handle = ?`
        );

        statement.executeSync([
          itens.Codigo,
          itens.Descricao,
          itens.DescLonga,
          itens.DescReduzida,
          itens.ComposicaoBarra,
          itens.Quantidade,
          itens.HandleGrupo2,
          itens.HandleGrupo3,
          itens.FotoBase64,
          itens.Observacao,
          itens.VendaValor,
          itens.Unidade,
          itens.Plataforma,
          itens.Handle,
        ]);

        console.log("Itens --> ", "Registro atualizado com sucesso!");
      } else {
        // Se o registro não existir, execute um INSERT
        const statement = database.prepareSync(
          `INSERT INTO itens
            (Handle, Codigo, Descricao, DescLonga, DescReduzida, ComposicaoBarra, Quantidade, HandleGrupo2, HandleGrupo3, FotoBase64, Observacao, VendaValor, Unidade, Plataforma)
           VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        statement.executeSync([
          itens.Handle,
          itens.Codigo,
          itens.Descricao,
          itens.DescLonga,
          itens.DescReduzida,
          itens.ComposicaoBarra,
          itens.Quantidade,
          itens.HandleGrupo2,
          itens.HandleGrupo3,
          itens.FotoBase64,
          itens.Observacao,
          itens.VendaValor,
          itens.Unidade,
          itens.Plataforma,
        ]);

        console.log("Itens --> ", "Novo registro inserido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar registro:", error);
      throw error;
    }
  }

  function all() {
    try {
      return database.getAllSync<ItensCreateDatabase>(`
        SELECT * FROM itens
      `);
    } catch (error) {
      console.error("Erro ao obter todos os registros:", error);
      throw error;
    }
  }

  return { createOrUpdate, all };
}
