import { API } from "@/services";

const obterToken = async (username: string, password: string) => {
  try {
    const { data } = await API.post("/token", {
      grant_type: "password",
      username: username,
      password: password,
    });

    return data.access_token;
  } catch (err) {
    console.error("Erro na solicitação de token:", err);
    throw err; // Lança o erro novamente para ser tratado no componente que chama esta função
  }
};

export { obterToken };
