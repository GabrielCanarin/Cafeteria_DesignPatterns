import { Logo } from "../../components/Logo";
import styles from "./PaymentPage.module.css";
import { useOrder } from "../../contexts/OrderContext";
import { useState } from "react";
import { Api } from "../../services/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const PaymentPage = () => {
  const { order, clearOrder } = useOrder();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handlePaymentChoice = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFinishOrder = async () => {
    const total = order.reduce((acc, item) => acc + item.price, 0);
    const paymentType = paymentMethod === "Pix" ? "pix" : "creditCard";

    try {
      const response = await Api.post("/order/finish", {
        paymentType: paymentType,
      });

      console.log("Pedido finalizado:", response.data.message);
      console.log("Total do pedido:", total);
      console.log("Método de pagamento:", response.data.paymentType);

      toast.success(
        `Pedido finalizado com sucesso. Total: R$ ${total.toFixed(
          2
        )}. Tipo de pagamento: ${response.data.paymentType}`
      );

      clearOrder();
    } catch (error) {
      console.error("Erro ao finalizar o pedido.", error);
      alert("Erro ao finalizar o pedido.");
    }
  };

  // Calcula o total do pedido
  const total = order.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Logo />
      <section className={styles.paymentContainer}>
        <div className={styles.paymentContainer_list}>
          <h1>Itens do Pedido</h1>
          <ul>
            {order.map((item) => (
              <li key={item.name}>
                {item.name} - R$ {item.price},00
              </li>
            ))}
          </ul>
          <h2>Total: R$ {total.toFixed(2)}</h2>
        </div>
        <div className={styles.paymentContainer_paymentForm}>
          <h2>Escolha a forma de Pagamento:</h2>
          <div className={styles.paymentContainer_buttons}>
            <button onClick={() => handlePaymentChoice("Pix")}>Pix</button>
            <button onClick={() => handlePaymentChoice("Cartão de Crédito")}>
              Cartão de Crédito
            </button>
          </div>
        </div>
        <div className={styles.paymentContainer_finish}>
          <Link to="/">
            <button className={styles.paymentContainer_BtnVoltar}>
              Voltar
            </button>
          </Link>
          <Link to="/">
            <button
              className={styles.paymentContainer_BtnFinalizar}
              onClick={handleFinishOrder}
              disabled={!paymentMethod}
            >
              Finalizar Pedido
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};
