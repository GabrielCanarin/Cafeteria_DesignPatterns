import { createContext, useContext, useState, ReactNode } from "react";
import { IItemMenu } from "../utils/types";
import { Api } from "../services/Api";
import { toast } from "react-toastify";

interface OrderContextProps {
  order: IItemMenu[];
  setOrder: React.Dispatch<React.SetStateAction<IItemMenu[]>>;
  addItem: (item: IItemMenu) => void;
  removeItem: (itemName: string) => void;
  clearOrder: () => void;
  selectedItems: Record<string, boolean>;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startOrder: () => Promise<void>;
  finishOrder: (paymentType: "creditCard" | "pix") => Promise<void>;
  getOrderTotal: () => number;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<IItemMenu[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  const startOrder = async () => {
    try {
      await Api.post("/order/start");
      toast.success("Pedido Iniciado");
      setOrder([]); // Limpa o estado do pedido local
    } catch (error) {
      console.error("Erro ao iniciar pedido:", error);
    }
  };
  // Adiciona item ao pedido

  const addItem = async (item: IItemMenu) => {
    try {
      await Api.post("/order/add", { itemName: item.name });
      setOrder((prevOrder) => [...prevOrder, item]);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };
  const removeItem = (itemName: string) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemName]: false,
    }));
    setOrder((prevOrder) =>
      prevOrder.filter((orderItem) => orderItem.name !== itemName)
    );
  };

  const clearOrder = () => {
    setOrder([]);
    setSelectedItems({});
  };

  const getOrderTotal = () => {
    const orderTotal = order.reduce((total, item) => total + item.price, 0);
    return orderTotal;
  };

  // Finaliza o pedido
  const finishOrder = async (paymentType: "creditCard" | "pix") => {
    try {
      await Api.post("/order/finish", { paymentType });
      setOrder([]); // Limpa o estado local
      toast.success("Pedido finalizado com sucesso.");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error("Erro ao finalizar pedido.");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        addItem,
        removeItem,
        clearOrder,
        selectedItems,
        setSelectedItems,
        isCartOpen,
        setIsCartOpen,
        startOrder,
        finishOrder, // Aqui não há mudanças, pois já está correto
        getOrderTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
