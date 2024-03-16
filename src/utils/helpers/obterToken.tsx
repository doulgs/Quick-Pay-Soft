import { API } from "@/services";

const obterToken = async () => {
  try {
    const { data } = await API.post("/token", {
      grant_type: "password",
      username: "integracao",
      password: "pbl@1991",
    });

    return data.access_token;
  } catch (err) {
    console.error("Erro na solicitação de token:", err);
  }
};

export { obterToken };
