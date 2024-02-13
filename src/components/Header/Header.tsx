import { Link, NavLink } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import logo from "../../assets/logo.jpg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.leftContainer} to="/">
        <img className={styles.logo} src={logo} alt="logo" />
        <h1 className={styles.links}>Get Office Tools</h1>
      </Link>

      <List className={styles.navContainer}>
        <ListItem>
          <NavLink className={styles.links} to="/">
            Home
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink className={styles.links} to="/cart-page">
            Cart
          </NavLink>
        </ListItem>
      </List>
    </header>
  );
};

export default Header;
