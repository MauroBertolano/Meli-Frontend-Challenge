import styles from "./itemsLayout.module.scss";

interface ItemsLayoutProps {
  children: React.ReactNode;
}

const ItemsLayout: React.FC<ItemsLayoutProps> = ({ children }) => {
  return <div className={styles["container"]}>{children}</div>;
};

export default ItemsLayout;
