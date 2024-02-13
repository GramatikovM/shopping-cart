import { useDispatch, useSelector } from "react-redux";
import { Button, ListItem } from "@mui/material";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  ProductsState,
  selectProductFromAll,
} from "../../redux/productsSlice";
import { Product } from "../../types";
import styles from "./ProductItem.module.css";

const ProductItem: React.FC<Product> = (props) => {
  const product = useSelector((state: ProductsState) =>
    selectProductFromAll(state, props.id)
  );
  const dispatch = useDispatch();
  const isItemQuantityValid =
    product?.quantitySelected && product?.quantitySelected > 0 ? false : true;

  const handleAddProduct = () => {
    dispatch(addToCart(props));
  };

  const handleRemoveProduct = () => {
    dispatch(removeFromCart(props));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(props.id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(props.id));
  };

  return (
    <ListItem className={styles.card}>
      <img src={props.imageUrl} alt={props.name} className={styles.image} />
      <p className={styles.cardInfo}>{props.name}</p>
      <p className={styles.cardInfo}>$ {props.price}</p>
      <div className={styles.quantityContainer}>
        <p className={styles.cardInfo}>Quantity: {product?.quantitySelected}</p>
        <Button
          variant="outlined"
          color="info"
          onClick={handleIncreaseQuantity}
        >
          +
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={handleDecreaseQuantity}
        >
          -
        </Button>
      </div>
      <div className={styles.bottomCardContainer}>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddProduct}
          disabled={isItemQuantityValid}
        >
          Add to cart
        </Button>
        <Button variant="contained" size="small" onClick={handleRemoveProduct}>
          Remove from cart
        </Button>
      </div>
    </ListItem>
  );
};

export default ProductItem;
