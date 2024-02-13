import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Cart from "../../components/Cart";
import styles from "./CartPage.module.css";

const CartPage = () => {
  return (
    <>
      <div className={styles.cartPageContainer}>
        <p className={styles.cartPageHeaderText}>
          Checkout when you made your product choice.
        </p>
        <p className={styles.cartPageHeaderText}>
          You can find your cart below:
        </p>
        <Cart />
      </div>
      <Link className={styles.backButton} to="/">
        <Button variant="outlined" color="info">
          Go Back to Product List
        </Button>
      </Link>
    </>
  );
};

export default CartPage;
