import ProductList from "../../components/ProductList";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  return (
    <div className={styles.pageContainer}>
      <ProductList />
    </div>
  );
};

export default ProductPage;
