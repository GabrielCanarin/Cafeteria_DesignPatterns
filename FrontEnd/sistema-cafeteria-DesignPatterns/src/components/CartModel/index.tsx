import { Link } from "react-router-dom";
import styles from "./CartModel.module.css";
import { FaTrash } from "react-icons/fa";
import { useOrder } from "../../contexts/OrderContext";

export const CartModal = () => {
  const {
    order,
    isCartOpen,
    removeItem,
    clearOrder,
    getOrderTotal,
    setIsCartOpen,
  } = useOrder();

  if (!isCartOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <h2>Seu Pedido</h2>
      {order.length === 0 ? (
        <p>Nenhum item adicionado. Adicione itens ao seu pedido!</p>
      ) : (
        <>
          <ul className={styles.orderList}>
            {order.map((item) => (
              <li key={item.name} className={styles.cartItem}>
                <div className={styles.ModalInfos}>
                  <span>{item.name}</span> ----- <span>R$ {item.price},00</span>
                </div>
                <FaTrash
                  onClick={() => removeItem(item.name)}
                  className={styles.btn_Remover}
                  aria-label={`Remover item ${item.name}`}
                />
              </li>
            ))}
          </ul>
          <div className={styles.orderTotal}>
            <span> Total: R$ {getOrderTotal()},00</span>
          </div>
        </>
      )}
      <div className={styles.actionButtons}>
        <button
          className={styles.btn_Descartar}
          onClick={() => {
            clearOrder();
            setIsCartOpen(false);
          }}
        >
          Descartar
        </button>
        <Link to="/payment">
          <button
            className={styles.btn_IrParCarrinho}
            disabled={order.length === 0}
          >
            Ir para o Pagamento
          </button>
        </Link>
      </div>
    </div>
  );
};
