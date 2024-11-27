import styles from "./Logo.module.css";
import LogoImg from "../../assets/CoffeMenu.png";
export const Logo = () => {
  return (
    <main className={styles.logoContainer}>
      <img src={LogoImg} alt="Logo" />
      <div className={styles.line}></div>
    </main>
  );
};
