import Image from "next/image";
import styles from "./itemCard.module.scss";
import freeShippingIcon from "../../public/ic_shipping.png";
import { useRouter } from "next/router";
import { Item } from "../../interfaces/Item";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();

  const redirectToItem = () => {
    router.push(`/items/${item.id}`);
  };

  return (
    <div className={styles["item-card"]}>
      <div className={styles["item-card-img"]} onClick={redirectToItem}>
        <Image
          src={item.picture}
          width={180}
          height={180}
          alt={item.title}
          title={item.title}
          style={{ borderRadius: "4px" }}
        />
      </div>
      <div className={styles["item-card-details"]}>
        <div className={styles["item-card-header"]}>
          <span className={styles["item-card-price"]} onClick={redirectToItem}>
            $ {item.price.amount}{" "}
            {item.freeShipping && (
              <Image
                src={freeShippingIcon}
                alt="Envio gratis"
                title="Envio gratis"
              />
            )}
          </span>
          <span className={styles["item-card-city"]}>{item.address}</span>
        </div>
        <h2 className={styles["item-card-title"]} onClick={redirectToItem}>
          {item.title}
        </h2>
      </div>
    </div>
  );
};

export default ItemCard;
