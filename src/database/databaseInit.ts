import { SQLiteDatabase } from "expo-sqlite/next";

export async function databaseInit(database: SQLiteDatabase) {
  await database.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS appconfig (
        NomeSite TEXT,
        usuariointegracao TEXT,
        senhaintegracao TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS grupos2 (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Codigo TEXT,
        Nome TEXT,
        Reduzido TEXT,
        FotoBase64 TEXT,
        PossuiComposicao INTEGER,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS grupos3 (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Codigo TEXT,
        Nome TEXT,
        Nome2 TEXT,
        Reduzido TEXT,
        QuantidadeItensComposicao REAL,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS execaoAuto (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleExcecao INTEGER,
        HandleItem INTEGER,
        Quantidade REAL,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS grupoExcecoes (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleGrupo2 INTEGER,
        Ordem TEXT,
        Descricao TEXT,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS excecoes (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleGrupoExcecao INTEGER,
        HandleGrupo2 INTEGER,
        HandleItem TEXT,
        IteHandle TEXT,
        Ordem TEXT,
        Excecao TEXT,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS itens (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Codigo TEXT,
        Descricao TEXT,
        DescLonga TEXT,
        DescReduzida TEXT,
        ComposicaoBarra TEXT,
        Quantidade REAL,
        HandleGrupo2 INTEGER,
        HandleGrupo3 INTEGER,
        FotoBase64 TEXT,
        Observacao TEXT,
        VendaValor REAL,
        Unidade TEXT,
        Plataforma TEXT,
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
        QtdParcelas INTEGER,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS filial (
        Handle INTEGER PRIMARY KEY NOT NULL,
        Nome TEXT,
        Razao TEXT,
        Fone TEXT,
        CnpjCpf TEXT,
        NomeSite TEXT,
        Endereco TEXT,
        Numero TEXT,
        Complemento TEXT,
        Bairro TEXT,
        Cep TEXT,
        Cidade TEXT,
        Estado TEXT,
        NumeroWhatsAppPedido TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS usuario (
        Handle INTEGER PRIMARY KEY NOT NULL,
        HandleFilial INTEGER,
        Login TEXT,
        Senha TEXT,
        Nome TEXT,
        Role TEXT,
        Plataforma TEXT,
        Created_at DEFAULT CURRENT_TIMESTAMP
      );

    `);
}
