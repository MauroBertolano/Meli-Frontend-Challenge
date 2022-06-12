import Image from "next/image";
import { Price } from "../../pages/items";
import styles from "./itemDetails.module.scss";

interface ItemDetails {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  freeShipping: boolean;
  soldQuantity: number;
  availableQuantity: number;
  description: string;
}

interface ItemDetailsProps {
  item: ItemDetails;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  return (
    <div className={styles["item-details-container"]}>
      <div className={styles["item-details-info"]}>
        <div>
          <Image
            src={item.picture}
            alt={item.title}
            title={item.title}
            width={680}
            height={680}
          />
        </div>
        <div>
          <h1 className={styles["item-description-title"]}>
            Detalles del producto
          </h1>
          <p className={styles["item-description"]}>{item.description}</p>
        </div>
      </div>
      <div>
        <p className={styles["item-details-condition"]}>
          {item.condition && `${item.condition} - `}
          {item.soldQuantity && `${item.soldQuantity} vendidos`}
        </p>
        <h2 className={styles["item-details-title"]}>{item.title}</h2>
        <p className={styles["item-details-price"]}>$ {item.price.amount}</p>
        <button
          className={`${styles["item-details-buy-btn"]}${
            item.availableQuantity == 0
              ? ` ${styles["item-details-sold-out"]}`
              : ""
          }`}
          role="button"
        >
          {item.availableQuantity > 0
            ? "Comprar"
            : "No hay articulos disponibles"}
        </button>
      </div>
    </div>
  );
};
export default ItemDetails;
