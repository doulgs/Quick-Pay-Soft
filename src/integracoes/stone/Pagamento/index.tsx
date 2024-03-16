import { Linking } from "react-native";

interface abrirAppPagamentoProps {
  path?: string;
  scheme?: string;
  return_scheme?: string; //Determina para onde será o retorno do deeplink. Deve ser o mesmo valor configurado no lugar da variável scheme no AndroidManifest.
  amount: string; //Valor do pagamento, em centavos. Aceita valores entre 0 e 999999999.
  editable_amount?: "1" | "0"; //Permite que o valor do pagamento seja editado diretamente no aplicativo de Pagamento. Valor 1 para true e 0 para false.
  transaction_type:
    | "DEBIT"
    | "CREDIT"
    | "VOUCHER"
    | "INSTANT_PAYMENT"
    | "PIX"
    | string; //Modalidade do pagamento: DEBIT, CREDIT, VOUCHER, INSTANT_PAYMENT e PIX. Esse campo aceita valor nulo.
  installment_type?: "MERCHANT" | "ISSUER" | "NONE"; //Tipo de parcelamento: MERCHANT (parcelado sem juros), ISSUER (parcelado com juros) e NONE (à vista). Esse campo aceita valor nulo.
  installment_count?: string; // Quantidade de parcelas. Aceita valores entre 2 e 99.
  order_id?: number; //Identificador do pedido. Aceita valores até 9223372036854775807. Caso queira utilizá-lo, habilitar a funcionalidade no aplicativo de Ajustes do POS.
}

/**
 * Abre o aplicativo de pagamento com os parâmetros fornecidos.
 * @param {abrirAppPagamentoProps} params Parâmetros para abrir o aplicativo de pagamento.
 * @param {string} params.return_scheme Determina para onde será o retorno do deeplink.
 * Deve ser o mesmo valor configurado no lugar da variável scheme no AndroidManifest.
 * Padrão: "linkpublipos".
 * @param {string} params.amount Valor do pagamento, em centavos. Aceita valores entre 0 e 999999999.
 * @param {"1" | "0"} [params.editable_amount="0"] Permite que o valor do pagamento seja editado diretamente
 * no aplicativo de Pagamento. Valor "1" para true e "0" para false. Padrão: "0".
 * @param {"DEBIT" | "CREDIT" | "VOUCHER" | "INSTANT_PAYMENT" | "PIX" | string} params.transaction_type
 * Modalidade do pagamento: DEBIT, CREDIT, VOUCHER, INSTANT_PAYMENT e PIX.
 * Este campo aceita valor nulo.
 * @param {"MERCHANT" | "ISSUER" | "NONE"} [params.installment_type="NONE"]
 * Tipo de parcelamento: MERCHANT (parcelado sem juros), ISSUER (parcelado com juros) e NONE (à vista).
 * Este campo aceita valor nulo. Padrão: "NONE".
 * @param {string} [params.installment_count="0"]
 * Quantidade de parcelas. Aceita valores entre 2 e 99. Padrão: "0".
 * @param {number} [params.order_id=12]
 * Identificador do pedido. Aceita valores até 9223372036854775807.
 * Caso queira utilizá-lo, habilitar a funcionalidade no aplicativo de Ajustes do POS.
 * Padrão: 12.
 */
const abrirAppPagamento = async ({
  return_scheme = "linkpublipos",
  amount,
  editable_amount = "1",
  transaction_type,
  installment_type = "NONE",
}: abrirAppPagamentoProps) => {
  if (!amount || !transaction_type) {
    console.error(
      "Parâmetros inválidos: amount e transaction_type são obrigatórios."
    );
    return;
  }

  try {
    let url: URL | null = null;

    // Switch case para diferentes tipos de transação
    switch (transaction_type) {
      case "DEBIT":
        url = new URL("payment-app://pay");
        url.searchParams.append("return_scheme", return_scheme);
        url.searchParams.append("amount", amount);
        url.searchParams.append("editable_amount", editable_amount);
        url.searchParams.append("transaction_type", transaction_type);
        //url.searchParams.append("order_id", order_id.toString());
        break;
      case "CREDIT":
        url = new URL("payment-app://pay");
        url.searchParams.append("return_scheme", return_scheme);
        url.searchParams.append("amount", amount);
        url.searchParams.append("editable_amount", editable_amount);
        url.searchParams.append("transaction_type", transaction_type);
        url.searchParams.append("installment_type", installment_type);
        //url.searchParams.append("order_id", order_id.toString());
        break;
      case "VOUCHER":
        break;
      case "INSTANT_PAYMENT":
        break;
      case "PIX":
        url = new URL("payment-app://pay");
        url.searchParams.append("return_scheme", return_scheme);
        url.searchParams.append("amount", amount);
        url.searchParams.append("editable_amount", editable_amount);
        url.searchParams.append("transaction_type", transaction_type);
        //url.searchParams.append("order_id", order_id.toString());
        break;
      default:
        console.warn("Tipo de transação não reconhecido:", transaction_type);
    }

    if (url) {
      // Verifica se a URL foi definida
      const supported = await Linking.canOpenURL(url.toString());
      if (supported) {
        await Linking.openURL(url.toString());
      } else {
        console.log(`Não foi possível abrir a URL: ${url}`);
      }
    }
  } catch (err) {
    console.error("Erro ao tentar abrir a URL", err);
  }
};

export { abrirAppPagamento };
