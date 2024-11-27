import { Link } from "react-router-dom";
import { IItemMenu } from "../../utils/types";
import styles from "./CartModel.module.css";
import { FaTrash } from "react-icons/fa";

interface ICartModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IItemMenu[];
  onRemoveItem: (itemName: string) => void;
  onFinishOrder?: () => void;
}

export const CartModal = ({
  isOpen,
  onClose,
  order,
  onRemoveItem,
}: ICartModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <h2>Seu Pedido</h2>
      {order.length === 0 ? (
        <p>Nenhum item adicionado. Adicione itens ao seu pedido!</p>
      ) : (
        <ul className={styles.orderList}>
          {order.map((item) => (
            <li key={item.name} className={styles.cartItem}>
              <div className={styles.ModalInfos}>
                <span>{item.name}</span> ----- <span>R$ {item.price},00</span>
              </div>
              <FaTrash
                onClick={() => onRemoveItem(item.name)}
                className={styles.btn_Remover}
                aria-label={`Remover item ${item.name}`}
              />
            </li>
          ))}
        </ul>
      )}
      <div className={styles.actionButtons}>
        <button className={styles.btn_Descartar} onClick={onClose}>
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
