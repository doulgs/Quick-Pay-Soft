export interface MODULOS_PROPS {
  id: number;
  nome_modulo: string;
  ativo: boolean;
}
export const MODULOS: MODULOS_PROPS[] = [
  {
    id: 1,
    nome_modulo: "CAIXA",
    ativo: true,
  },
  {
    id: 2,
    nome_modulo: "BALCAO",
    ativo: true,
  },
  {
    id: 3,
    nome_modulo: "MESAS",
    ativo: true,
  },
  {
    id: 4,
    nome_modulo: "CARTOES",
    ativo: true,
  },
  {
    id: 5,
    nome_modulo: "PRODUTOS",
    ativo: true,
  },
  {
    id: 6,
    nome_modulo: "RELATORIOS",
    ativo: true,
  },
  // {
  //   id: 7,
  //   nome_modulo: "TESTE",
  //   ativo: true,
  // },
];
