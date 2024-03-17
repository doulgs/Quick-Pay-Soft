import { useState, useContext, createContext } from "react";
import { interface_itens } from "@/types";

interface OrderContextProps {
  order: interface_itens[];
}

export const OrderContext = createContext<OrderContextProps>(
  {} as OrderContextProps
);

export const OrderProvider = ({ children }: any) => {
  const [order, setOrder] = useState<interface_itens[]>([]);

  return (
    <OrderContext.Provider
      value={{
        order,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  return context;
};
