import { SQLiteDatabase } from "expo-sqlite/next";

export async function databaseInit(database: SQLiteDatabase) {
  await database.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS grupos2 (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Codigo TEXT NOT NULL,
        Nome TEXT NOT NULL,
        Reduzido TEXT NOT NULL,
        FotoBase64 TEXT NOT NULL,
        PossuiComposicao INTEGER NOT NULL,
        Plataforma TEXT NOT NULL,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS grupoExcecoes (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleGrupo2 INTEGER NOT NULL,
        Ordem TEXT NOT NULL,
        Descricao TEXT NOT NULL,
        Plataforma TEXT NOT NULL,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS excecoes (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleGrupoExcecao INTEGER NOT NULL,
        HandleGrupo2 TEXT NOT NULL,
        HandleItem TEXT,
        IteHandle TEXT,
        Ordem TEXT NOT NULL,
        Excecao TEXT NOT NULL,
        Plataforma TEXT NOT NULL,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS itens (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Codigo TEXT NOT NULL,
        Descricao TEXT NOT NULL,
        DescLonga TEXT,
        DescReduzida TEXT,
        ComposicaoBarra TEXT NOT NULL,
        Quantidade REAL NOT NULL,
        HandleGrupo2 INTEGER,
        HandleGrupo3 INTEGER,
        FotoBase64 TEXT,
        Observacao TEXT,
        VendaValor REAL,
        Unidade TEXT,
        Plataforma TEXT NOT NULL,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS condicoes (
        Handle INTEGER PRIMARY KEY NOT NULL,
        TipoPagto TEXT,
        Descricao TEXT,
        EhDinheiro INTEGER,
        Plataforma TEXT,
        Ativo INTEGER,
        CodigoIntegracao TEXT,
        TipoParcelamentoPos TEXT,
        QtdParcelas INTEGER
        Created_at DEFAULT CURRENT_TIMESTAMP
      );
    `);
}
