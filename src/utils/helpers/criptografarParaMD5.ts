import * as Crypto from "expo-crypto";

export const criptografarParaMD5 = async (
  toEncrypt: string
): Promise<string> => {
  // Cria um hash MD5 da string
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD5,
    toEncrypt,
    { encoding: Crypto.CryptoEncoding.HEX }
  );

  return hash;
};
