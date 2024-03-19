import * as Crypto from "expo-crypto";

export const criptografarParaMD5 = async (
  toEncrypt: string
): Promise<string> => {
  // Converte a string para um ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(toEncrypt);

  // Aqui, em vez de passar diretamente o Uint8Array para digestStringAsync,
  // primeiro convertemos o Uint8Array de volta para uma string usando TextDecoder.
  // Isso é necessário porque digestStringAsync espera uma string como entrada.
  const decoder = new TextDecoder();
  const dataAsString = decoder.decode(data);

  // Cria um hash MD5 da string
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    dataAsString,
    { encoding: Crypto.CryptoEncoding.HEX }
  );

  return hash;
};
