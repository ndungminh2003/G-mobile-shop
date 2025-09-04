import styles from "./styles.module.scss";
import { BsArrowRightCircle } from "react-icons/bs";

export default function Category({ header, products, background }) {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.map((product) => (
          <div className={styles.product}>
            <img src={product.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
