import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CartModal from "../CartModal";
import ProductItem from "../ProductItem/ProductItem";
import {
  calculateDiscount,
  fetchProducts,
  ProductsState,
} from "../../redux/productsSlice";
import type { Product } from "../../types";
import type { AppDispatch } from "../../redux/store";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import {
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
} from "../../utilities/utilities";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: ProductsState) => state.products);
  const cartProducts = useSelector((state: ProductsState) => state.cart);
  const productsStatus: string = useSelector(
    (state: ProductsState) => state.productsStatus
  );
  const error = useSelector((state: ProductsState) => state.productsError);
  const isGetDiscountActive = !!cartProducts.length;
  const availableCategories = products.flatMap((product) => product.categories);
  const filteredCategories = [
    ...availableCategories.filter(
      (category, index) => availableCategories.indexOf(category) === index
    ),
    "all",
  ];
  const [categoryValue, setCategoryValue] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const isModalOpen = !!(cartProducts.length > 0);

  const handleSelectCategory = (event: SelectChangeEvent<string>) => {
    setCategoryValue((event.target as HTMLInputElement).value);
  };
  const handleGetDiscount = () => {
    dispatch(calculateDiscount());
  };
  const handleNameSortAsc = () => {
    sortByNameAsc(filteredProducts, setFilteredProducts);
  };
  const handleNameSortDesc = () => {
    sortByNameDesc(filteredProducts, setFilteredProducts);
  };
  const handlePriceSortAsc = () => {
    sortByPriceAsc(filteredProducts, setFilteredProducts);
  };
  const handlePriceSortDesc = () => {
    sortByPriceDesc(filteredProducts, setFilteredProducts);
  };
  const handleReset = () => {
    setFilteredProducts(products);
    setCategoryValue("all");
  };

  useEffectOnce(() => {
    const abortController = new AbortController();
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
    return () => {
      abortController.abort();
    };
  }, [productsStatus, dispatch]);

  useEffect(() => {
    if (categoryValue === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.categories.includes(categoryValue))
      );
    }
  }, [categoryValue, products]);

  if (productsStatus === "loading")
    return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>Something went wrong.</p>;

  return (
    <div className={styles.productPageContainer}>
      <FormControl className={styles.filterContainer}>
        <InputLabel id="category-filter">Filter by Category: </InputLabel>
        <Select
          labelId="category-filter"
          value={categoryValue || ""}
          onChange={handleSelectCategory}
          children={filteredCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        />
      </FormControl>
      <div className={styles.sortButtonContainer}>
        <div>
          <span>Sort by Name: </span>
          <Button
            className={styles.sortButton}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<ArrowUpwardIcon />}
            onClick={handleNameSortAsc}
          >
            A - Z
          </Button>
          <Button
            className={styles.sortButton}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<ArrowDownwardIcon />}
            onClick={handleNameSortDesc}
          >
            Z - A
          </Button>
        </div>
        <div>
          <span>Sort by Price: </span>
          <Button
            className={styles.sortButton}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<ArrowUpwardIcon />}
            onClick={handlePriceSortAsc}
          >
            Ascend
          </Button>
          <Button
            className={styles.sortButton}
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<ArrowDownwardIcon />}
            onClick={handlePriceSortDesc}
          >
            Descend
          </Button>
        </div>
      </div>
      <Button
        className={styles.otherButton}
        variant="contained"
        color="warning"
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        className={styles.otherButton}
        variant="contained"
        color="success"
        onClick={handleGetDiscount}
        disabled={!isGetDiscountActive}
      >
        Get Discount
      </Button>
      <List className={styles.productContainer}>
        {filteredProducts?.map((product: Product) => (
          <ProductItem
            key={`product${product.id}`}
            name={product.name}
            id={product.id}
            quantitySelected={product.quantitySelected}
            price={product.price}
            imageUrl={product.imageUrl}
            categories={product.categories}
            supplierId={product.supplierId}
          />
        ))}
      </List>
      <CartModal isModalOpen={isModalOpen} />
    </div>
  );
};

export default ProductList;
