import { Snackbar } from "@mui/material";
import Cart from "../Cart";
import styles from "./CartModal.module.css";

type Props = {
  isModalOpen: boolean;
};

const CartModal: React.FC<Props> = ({ isModalOpen }) => {
  return (
    <Snackbar
      open={isModalOpen}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      message={<Cart />}
      className={styles.cartInfoContainer}
    />
  );
};

export default CartModal;
