import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MenuItem } from "../../components/Menu/MenuItem";
import { IItemMenu } from "../../utils/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartModal } from "../CartModel";
import styles from "./Menu.module.css";
import { useOrder } from "../../contexts/OrderContext";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState<IItemMenu[]>([]);

  const {
    order,
    setOrder,
    addItem,
    removeItem,
    selectedItems,
    setSelectedItems,
    isCartOpen,
    setIsCartOpen,
    startOrder,
  } = useOrder();

  // Trazer Menu
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await Api.get("/menu");
        setMenuItems(response.data);
      } catch (error) {
        toast.error("Erro ao buscar os itens do menu");
        console.error("Erro ao buscar os itens do menu:", error);
      }
    };
    fetchMenuItems();
  }, []);

  // Adicionar
  const handleAddItem = (item: IItemMenu, isSelected: boolean) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [item.name]: isSelected,
    }));

    if (isSelected) {
      if (order.length === 0) {
        startOrder();
      }
      addItem(item);
      toast.success(`${item.name} adicionado ao pedido.`);
    } else {
      removeItem(item.name);
      toast.warn(`${item.name} removido do pedido.`);
    }

    setIsCartOpen(true);
  };

  const handleDiscardOrder = () => {
    setIsCartOpen(false);
    setSelectedItems({});
    setOrder([]);
    toast.info("Pedido Finalizado");
  };

  // Gera as categorias
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  // Agrupa os itens do menu por categoria
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = menuItems.filter((item) => item.category === category);
    return acc;
  }, {} as Record<string, IItemMenu[]>);

  return (
    <section className={styles.menuContainer}>
      {categories.map((category) => (
        <div className={styles.menuContainer_item} key={category}>
          <h2 className={styles.menuContainer_title}>{category}</h2>
          {groupedItems[category]?.map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              isChecked={selectedItems[item.name] || false}
              onSelect={(item, isSelected) => handleAddItem(item, isSelected)}
            />
          ))}
        </div>
      ))}

      <CartModal
        isOpen={isCartOpen}
        onClose={handleDiscardOrder}
        order={order}
        onRemoveItem={(itemName) => removeItem(itemName)}
      />
    </section>
  );
};
