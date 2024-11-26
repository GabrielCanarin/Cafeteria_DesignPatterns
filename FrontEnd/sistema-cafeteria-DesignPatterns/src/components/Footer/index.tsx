import imgFooter from "../../assets/footer-image.png";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={imgFooter} />
    </footer>
  );
};
