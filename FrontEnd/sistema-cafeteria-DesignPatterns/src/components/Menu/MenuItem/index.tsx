import { IItemMenu } from "../../../utils/types";
import styles from "./MenuItem.module.css";

interface MenuItemProps {
  item: IItemMenu;
  onSelect: (item: IItemMenu, isSelected: boolean) => void;
  isChecked: boolean;
}

export const MenuItem = ({ item, onSelect, isChecked }: MenuItemProps) => {
  const handleCheckboxChange = () => {
    onSelect(item, !isChecked);
  };

  return (
    <div className={styles.menuItem_Container}>
      <div className={styles.menuItem_selectItem}>
        <input
          id={item.name}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <h3 className={styles.menuItem_title}>{item.name}</h3>
      </div>
      <div className={styles.menuItem_line}></div>
      <div className={styles.menuItem_price}>
        <p className={styles.menuItem_price}>R$ {item.price},00</p>
      </div>
    </div>
  );
};
