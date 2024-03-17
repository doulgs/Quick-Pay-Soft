export interface interface_grupos2 {
  Handle: number;
  Codigo: string;
  Nome: string;
  Reduzido: string;
  FotoBase64: string | null;
  PossuiComposicao: boolean;
  Plataforma: string;
}
export interface interface_grupoExcecoes {
  Handle: number;
  HandleGrupo2: number;
  Ordem: string;
  Descricao: string;
  Plataforma: string;
}
export interface interface_excecoes {
  Handle: number;
  HandleGrupoExcecao: number;
  HandleGrupo2: number;
  HandleItem: number | null;
  IteHandle: number | null;
  Ordem: string;
  Excecao: string;
  Plataforma: string;
}
export interface interface_itens {
  Handle: number;
  Codigo: string;
  Descricao: string;
  DescLonga: string | null;
  DescReduzida: string | null;
  ComposicaoBarra: string;
  Quantidade: number;
  HandleGrupo2: number;
  HandleGrupo3: number | null;
  FotoBase64: string | null;
  Observacao: string | null;
  VendaValor: number | null;
  Unidade: string;
  Plataforma: string;
}
export interface interface_condicoes {
  Handle: number;
  TipoPagto: string | null;
  Descricao: string;
  EhDinheiro: boolean;
  Plataforma: string;
  Ativo: number;
  CodigoIntegracao: string;
  TipoParcelamentoPos: string;
  QtdParcelas: number;
}
