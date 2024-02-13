import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ProductsState, clearCart } from "../../redux/productsSlice";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: ProductsState) => state.cart);
  const price = useSelector((state: ProductsState) => state.totalPrice);
  const shippingPrice = useSelector(
    (state: ProductsState) => state.shippingPrice
  );
  const discount = useSelector((state: ProductsState) => state.discount);
  const isCartShown = !!(cartProducts.length > 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return isCartShown ? (
    <div className={styles.cartContainer}>
      <div>
        {cartProducts.map((product) => (
          <div key={product.id}>
            <span>{product.name}, </span>
            <span>Price: {product.price}, </span>
            <span>Quantity: {product.quantitySelected}</span>
          </div>
        ))}
      </div>
      <p>Shipping: {shippingPrice}</p>
      <p>Discount: {discount}</p>
      <p>Total Cost: {price + shippingPrice - discount}</p>
      <div className={styles.buttonContainer}>
        <Link to="/cart-page">
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={handleClearCart}>
          Clear
        </Button>
      </div>
    </div>
  ) : (
    <>
      <p>No products in Cart.</p>
    </>
  );
};

export default Cart;
