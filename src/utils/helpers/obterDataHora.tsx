export const obterDataHora = () => {
  const data = new Date();
  const horas = ("0" + data.getHours()).slice(-2);
  const minutos = ("0" + data.getMinutes()).slice(-2);
  const dia = ("0" + data.getDate()).slice(-2);
  const mes = ("0" + (data.getMonth() + 1)).slice(-2);
  const ano = data.getFullYear();

  const dataHoraAtual = `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  const horaAtual = `${horas}:${minutos}`;
  const dataAtual = `${dia}/${mes}/${ano}`;

  return { dataHoraAtual, horaAtual, dataAtual };
};
