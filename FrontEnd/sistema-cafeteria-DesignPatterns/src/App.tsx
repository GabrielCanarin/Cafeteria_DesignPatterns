import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { OrderProvider } from "./contexts/OrderContext";

export const App = () => {
  return (
    <OrderProvider>
      <Header />
      <div className={styles.AppContainer}>
        <Outlet />
      </div>
      <Footer />
    </OrderProvider>
  );
};
